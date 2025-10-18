import React, { useState, useEffect } from 'react';
import './index.css';
import { useParams } from 'react-router';
import ImageMagnifier from '../Image/Image';

function DetailedView() {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const { id } = useParams();

  
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

  // ✅ Fetch reviews for product
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

  // ✅ Create new review
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

  // ✅ Delete review
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

  return (
    <div className="detail-view">
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
          <p>₹{product.price}</p>
          <h2>RATING:</h2>
          <p>⭐{product.rating}</p>
          <button>Add to Cart</button>
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
          <p>No reviews yet. Be the first to review!</p>
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
              }}
            >
              <p>{review.review}</p>
              <button
                onClick={() => handleDeleteReview(review._id)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DetailedView;
