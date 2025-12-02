// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';
// import './Wishlist.css';

// function Wishlist() {
//   const navigate = useNavigate();
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const token = Cookies.get('jwt_token');
//     if (token) {
//       try {
//         const decoded = jwt_decode(token);
//         setUserId(decoded.email);
//         fetchWishlist(decoded.email);
//       } catch (err) {
//         setError('Invalid token');
//       }
//     }
//   }, []);

//   const fetchWishlist = async (email) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://backend-commerce-1.onrender.com/api/wishlist/${email}`
//       );

//       const data = await response.json();

//       if (response.ok && data.ok) {
//         setWishlist(data.data.products || []);
//       } else {
//         setError(data.message || 'Failed to fetch wishlist');
//       }
//     } catch (err) {
//       setError('Error fetching wishlist: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     try {
//       const response = await fetch(
//         `https://backend-commerce-1.onrender.com/api/wishlist/${userId}/${productId}`,
//         { method: 'DELETE' }
//       );

//       const data = await response.json();

//       if (response.ok && data.ok) {
//         setWishlist(data.data.products || []);
//       } else {
//         setError(data.message || 'Failed to remove from wishlist');
//       }
//     } catch (err) {
//       setError('Error removing from wishlist: ' + err.message);
//     }
//   };

//   const clearWishlist = async () => {
//     if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
//       try {
//         const response = await fetch(
//           `https://backend-commerce-1.onrender.com/api/wishlist/${userId}`,
//           { method: 'DELETE' }
//         );

//         const data = await response.json();

//         if (response.ok && data.ok) {
//           setWishlist([]);
//         } else {
//           setError(data.message || 'Failed to clear wishlist');
//         }
//       } catch (err) {
//         setError('Error clearing wishlist: ' + err.message);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="wishlist-container">
//         <div className="wishlist-card">
//           <div className="loader">Loading wishlist...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="wishlist-container">
//       <div className="wishlist-card">
//         <h1>My Wishlist</h1>

//         {error && <div className="error-message">{error}</div>}

//         {wishlist.length === 0 ? (
//           <div className="empty-wishlist">
//             <p>Your wishlist is empty</p>
//             <button onClick={() => navigate('/products')} className="continue-shopping">
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="wishlist-grid">
//               {wishlist.map((product) => (
//                 <div key={product.id} className="wishlist-item">
//                   <Link to={`/product/${product.id}`} className="item-link">
//                     <div className="item-image">
//                       <img src={product.image} alt={product.name} />
//                     </div>
//                     <div className="item-info">
//                       <h3>{product.name}</h3>
//                       <p className="price">₹{product.price}</p>
//                       <p className="rating">⭐ {product.rating || 'N/A'}</p>
//                     </div>
//                   </Link>
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeFromWishlist(product.id)}
//                     title="Remove from wishlist"
//                   >
//                     ❌ Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div className="wishlist-actions">
//               <button 
//                 className="continue-shopping"
//                 onClick={() => navigate('/products')}
//               >
//                 Continue Shopping
//               </button>
//               <button 
//                 className="clear-wishlist-btn"
//                 onClick={clearWishlist}
//               >
//                 Clear Wishlist
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Wishlist;
