import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../config';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill in all personal details');
      return false;
    }
    if (!formData.street || !formData.city || !formData.state || !formData.zipCode) {
      toast.error('Please fill in all address details');
      return false;
    }
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    return true;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const jwtToken = Cookies.get('jwt_token');

      // 1. Create Razorpay Order
      const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'INR'
        })
      });

      const order = await res.json();

      if (!res.ok) {
        throw new Error(order.message || 'Failed to create payment order');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_placeholder',
        amount: order.amount,
        currency: order.currency,
        name: 'ShopEasy',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch(`${API_BASE_URL}/payment/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.ok) {
            // 4. Create Order in DB
            const orderData = {
              items: cart.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.count,
                price: item.price,
                image: item.image
              })),
              shippingAddress: {
                address: formData.street,
                city: formData.city,
                postalCode: formData.zipCode,
                country: formData.country
              },
              totalPrice: totalPrice,
              paymentResult: {
                id: response.razorpay_payment_id,
                status: 'success',
                update_time: new Date().toISOString(),
                email_address: formData.email
              }
            };

            const dbOrderRes = await fetch(`${API_BASE_URL}/order`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
              },
              body: JSON.stringify(orderData)
            });

            if (dbOrderRes.ok) {
              clearCart();
              toast.success('Order placed successfully!');
              navigate('/payment');
            } else {
              toast.error('Failed to save order details');
            }
          } else {
            toast.error(verifyData.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (err) {
      setError('Error: ' + err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-card">
          <h1>Checkout</h1>
          <p className="empty-message">Your cart is empty. Add items before checkout.</p>
          <button onClick={() => navigate('/products')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-form">
          <section className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </section>

          <section className="form-section">
            <h2>Delivery Address</h2>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          <section className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item._id} className="summary-item">
                  <span>{item.name} x {item.count}</span>
                  <span>₹{(item.price * item.count).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total Amount: ₹{totalPrice.toFixed(2)}</strong>
            </div>
          </section>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order & Pay'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
