import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import { useParams } from 'react-router';
import { CartContext } from '../CartContext';
import Cookies from 'js-cookie';
import ImageMagnifier from '../Image/Image';
import Navbar from '../Navbar/Navbar';

function DetailedView() {
  // const { addToCart } = useContext(CartContext);
   const { addToCart, removeFromCart, cart } = useContext(CartContext)
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  // const [quantity, setQuantity] = useState(1);
  // const [wishlistLoading, setWishlistLoading] = useState(false);

  const { id } = useParams();
 const getQuantity = (id) => {
  const item = cart.find(p => p._id === id)
  return (item? item.count : 0)
}
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const url = `https://backend-commerce-1.onrender.com/api/product/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setProduct(data.data);
      } catch (e) {
        console.log('Error fetching product:', e);
      }
    };
    getProduct();
  }, [id]);

 
  useEffect(() => {
    const getReviews = async () => {
      try {
        const url = `https://backend-commerce-1.onrender.com/api/review/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        setReviews(data.data || []);
      } catch (e) {
        console.log('Error fetching reviews:', e);
      }
    };
    getReviews();
  }, [id]);


  const handleCreateReview = async () => {
    if (!newReview.trim()) return alert('Please write a review before submitting.');

    try {
      const url = `https://backend-commerce-1.onrender.com/api/review/${id}`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review: newReview }),
      };
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setReviews([...reviews, data.data]); // instantly update list
        setNewReview('');
      } else {
        alert(data.message || 'Failed to post review.');
      }
    } catch (e) {
      console.log('Error creating review:', e);
      alert(e.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const url = `https://backend-commerce-1.onrender.com/api/review/${reviewId}`;
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();

      if (response.ok) {
        setReviews(reviews.filter((r) => r._id !== reviewId));
      } else {
        alert(data.message || 'Failed to delete review.');
      }
    } catch (e) {
      console.log('Error deleting review:', e);
    }
  };

 
  // const handleAddToCart = () => {
  //   for (let i = 0; i < quantity; i++) {
  //     addToCart(product);
  //   }
  //   setQuantity(1);
  //   alert(`${quantity} item(s) added to cart!`);
  // };

 
  // const handleAddToWishlist = async () => {
  //   try {
  //     const token = Cookies.get('jwt_token');
  //     if (!token) {
  //       alert('Please login to add items to wishlist');
  //       return;
  //     }

  //     setWishlistLoading(true);

  //     const response = await fetch(
  //       'https://backend-commerce-1.onrender.com/api/wishlist'
  //     );

  //     const data = await response.json();
  //     if (response.ok && data.ok) {
  //       alert('Added to wishlist!');
  //     } else {
  //       alert(data.message || 'Failed to add to wishlist');
  //     }
  //   } catch (err) {
  //     console.error('Error adding to wishlist:', err);
  //     alert('Error adding to wishlist');
  //   } finally {
  //     setWishlistLoading(false);
  //   }
  // };

  return (
    <div className="detail-view">
      <Navbar/>
      <div className="products-card">
        <div className="flex">
          <ImageMagnifier
            src={product.image}
            width={300}
            height={300}
            magnifierHeight={300}
            magnifierWidth={300}
            zoomLevel={3}
            alt={product.name}
          />
        </div>

        <div className="product-details">
          <h2>PRODUCT NAME:</h2>
          <p>{product.name}</p>
          <h2>DESCRIPTION:</h2>
          <p>{product.description}</p>
          <h2>PRICE:</h2>
          <p className="price-text">₹{product.price}</p>
          <h2>RATING:</h2>
          <p>⭐{product.rating || 'N/A'}</p>
          
        {getQuantity(product._id) > 0 ? (
                    <div className="cart-buttons">
                      <button onClick={() => removeFromCart(product._id)}>-</button>
                      <span>{getQuantity(product._id)}</span>
                      <button onClick={() => addToCart(product)}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  )}
                  
                 
         
        </div>
      </div>

      {/* ✅ Review Section */}
      <div className="review-section">
        <h2>Reviews</h2>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            style={{
              width: '50%',
              margin: '0px 10px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid gray',
            }}
          />
          <button
            onClick={handleCreateReview}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#00aaff',
              color: 'white',
            }}
          >
            Submit
          </button>
        </div>

        {reviews.length === 0 ? (
          <p 
            style={{ fontStyle: 'italic', color: 'black', margin:'10px 10px' }}

          >No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                borderBottom: '1px solid gray',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin:'0 10px',
                fontWeight:'500'
              }}
            >
              <p>{review.review}</p>
              <button
                onClick={() => handleDeleteReview(review._id)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                }}
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DetailedView;
