// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../CartContext';
// import Cookies from 'js-cookie';
// import './Checkout.css';

// function Checkout() {
//   const navigate = useNavigate();
//   const { cart, clearCart, totalPrice } = useContext(CartContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: '',
//     cardNumber: '',
//     cardName: '',
//     expiryDate: '',
//     cvv: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.firstName || !formData.lastName || !formData.email) {
//       setError('Please fill in all personal details');
//       return false;
//     }
//     if (!formData.street || !formData.city || !formData.state || !formData.zipCode) {
//       setError('Please fill in all address details');
//       return false;
//     }
//     if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
//       setError('Please fill in all payment details');
//       return false;
//     }
//     if (cart.length === 0) {
//       setError('Your cart is empty');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const jwtToken = Cookies.get('jwt_token');
      
//       const orderData = {
//         userId: jwtToken,
//         email: formData.email,
//         items: cart.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           image: item.image,
//           quantity: item.count,
//           total: item.price * item.count
//         })),
//         address: {
//           street: formData.street,
//           city: formData.city,
//           state: formData.state,
//           zipCode: formData.zipCode,
//           country: formData.country
//         },
//         totalAmount: totalPrice,
//         paymentMethod: 'card'
//       };

//       const response = await fetch('https://backend-commerce-1.onrender.com/api/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(orderData)
//       });

//       const data = await response.json();

//       if (response.ok && data.ok) {
//         clearCart();
//         navigate('/payment');
//       } else {
//         setError(data.message || 'Failed to place order');
//       }
//     } catch (err) {
//       setError('Error placing order: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="checkout-container">
//         <div className="checkout-card">
//           <h1>Checkout</h1>
//           <p className="empty-message">Your cart is empty. Add items before checkout.</p>
//           <button onClick={() => navigate('/products')} className="continue-shopping">
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-container">
//       <div className="checkout-card">
//         <h1>Checkout</h1>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit} className="checkout-form">
//           <section className="form-section">
//             <h2>Personal Information</h2>
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//           </section>

//           <section className="form-section">
//             <h2>Delivery Address</h2>
//             <input
//               type="text"
//               name="street"
//               placeholder="Street Address"
//               value={formData.street}
//               onChange={handleInputChange}
//               required
//             />
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="Zip Code"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 placeholder="Country"
//                 value={formData.country}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </section>

//           <section className="form-section">
//             <h2>Payment Information</h2>
//             <input
//               type="text"
//               name="cardName"
//               placeholder="Cardholder Name"
//               value={formData.cardName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="cardNumber"
//               placeholder="Card Number (16 digits)"
//               value={formData.cardNumber}
//               onChange={handleInputChange}
//               maxLength="16"
//               pattern="\d{16}"
//               required
//             />
//             <div className="form-row">
//               <input
//                 type="text"
//                 name="expiryDate"
//                 placeholder="MM/YY"
//                 value={formData.expiryDate}
//                 onChange={handleInputChange}
//                 maxLength="5"
//                 pattern="\d{2}/\d{2}"
//                 required
//               />
//               <input
//                 type="text"
//                 name="cvv"
//                 placeholder="CVV (3 digits)"
//                 value={formData.cvv}
//                 onChange={handleInputChange}
//                 maxLength="3"
//                 pattern="\d{3}"
//                 required
//               />
//             </div>
//           </section>

//           <section className="order-summary">
//             <h2>Order Summary</h2>
//             <div className="summary-items">
//               {cart.map(item => (
//                 <div key={item._id} className="summary-item">
//                   <span>{item.name} x {item.count}</span>
//                   <span>₹{(item.price * item.count).toFixed(2)}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="summary-total">
//               <strong>Total Amount: ₹{totalPrice.toFixed(2)}</strong>
//             </div>
//           </section>

//           <button type="submit" className="place-order-btn" disabled={loading}>
//             {loading ? 'Processing...' : 'Place Order'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
