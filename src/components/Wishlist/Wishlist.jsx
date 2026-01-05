import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

import API_BASE_URL from '../../config';
import './Wishlist.css';

function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('jwt_token');
      if (!token) {
        setError('Please login to view wishlist');
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );

      const data = await response.json();

      if (response.ok) {
        setWishlist(data.products || []);
      } else {
        setError(data.message || 'Failed to fetch wishlist');
      }
    } catch (err) {
      setError('Error fetching wishlist: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const token = Cookies.get('jwt_token');
      const response = await fetch(
        `${API_BASE_URL}/wishlist/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setWishlist(wishlist.filter(item => item._id !== productId));
        // Removed from wishlist
      } else {
        console.error(data.message || 'Failed to remove');
      }
    } catch (err) {
      console.error('Error removing from wishlist');
    }
  };

  if (loading) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-card">
          <div className="loader">Loading wishlist...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-card">
        <h1>My Wishlist</h1>

        {error && <div className="error-message">{error}</div>}

        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-grid">
              {wishlist.map((product) => (
                <div key={product._id} className="wishlist-item">
                  <Link to={`/product/${product.id}`} className="item-link">
                    <div className="item-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="item-info">
                      <h3>{product.name}</h3>
                      <p className="price">₹{product.price}</p>
                      <p className="rating">⭐ {product.rating || 'N/A'}</p>
                    </div>
                  </Link>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product._id)}
                    title="Remove from wishlist"
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="wishlist-actions">
              <button
                className="continue-shopping"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
