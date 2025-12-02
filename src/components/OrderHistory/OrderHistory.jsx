// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';
// import './OrderHistory.css';

// function OrderHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const token = Cookies.get('jwt_token');
      
//       if (!token) {
//         setError('Please login to view orders');
//         setLoading(false);
//         return;
//       }

//       const decoded = jwt_decode(token);
//       const email = decoded.email;

//       const response = await fetch(
//         `https://backend-commerce-1.onrender.com/api/orders/${email}`
//       );

//       const data = await response.json();

//       if (response.ok && data.ok) {
//         setOrders(data.data);
//       } else {
//         setError(data.message || 'Failed to fetch orders');
//       }
//     } catch (err) {
//       setError('Error fetching orders: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'confirmed':
//         return '#667eea';
//       case 'shipped':
//         return '#f39c12';
//       case 'delivered':
//         return '#27ae60';
//       case 'cancelled':
//         return '#e74c3c';
//       case 'pending':
//         return '#95a5a6';
//       default:
//         return '#333';
//     }
//   };

//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="order-history-container">
//         <div className="order-history-card">
//           <div className="loader">Loading orders...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="order-history-container">
//       <div className="order-history-card">
//         <h1>Order History</h1>

//         {error && <div className="error-message">{error}</div>}

//         {orders.length === 0 ? (
//           <div className="no-orders">
//             <p>You haven't placed any orders yet.</p>
//           </div>
//         ) : (
//           <div className="orders-list">
//             {orders.map((order) => (
//               <div key={order._id} className="order-item">
//                 <div 
//                   className="order-header"
//                   onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
//                 >
//                   <div className="order-summary">
//                     <h3>Order #{order._id.slice(-8)}</h3>
//                     <p className="order-date">{formatDate(order.createdAt)}</p>
//                   </div>
//                   <div className="order-info">
//                     <p className="order-amount">₹{order.totalAmount.toFixed(2)}</p>
//                     <span 
//                       className="order-status"
//                       style={{ backgroundColor: getStatusColor(order.status) }}
//                     >
//                       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                     </span>
//                   </div>
//                 </div>

//                 {expandedOrder === order._id && (
//                   <div className="order-details">
//                     <div className="details-section">
//                       <h4>Items Ordered</h4>
//                       <ul className="items-list">
//                         {order.items.map((item, idx) => (
//                           <li key={idx} className="item">
//                             <span>{item.name} x{item.quantity}</span>
//                             <span>₹{(item.total).toFixed(2)}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     {order.address && (
//                       <div className="details-section">
//                         <h4>Delivery Address</h4>
//                         <p>
//                           {order.address.street}<br />
//                           {order.address.city}, {order.address.state} {order.address.zipCode}<br />
//                           {order.address.country}
//                         </p>
//                       </div>
//                     )}

//                     <div className="details-section">
//                       <h4>Order Timeline</h4>
//                       <div className="timeline">
//                         <div className="timeline-item confirmed">
//                           <span className="timeline-dot"></span>
//                           <span>Order Confirmed</span>
//                           <span className="timeline-date">{formatDate(order.createdAt)}</span>
//                         </div>
//                         {['shipped', 'delivered'].includes(order.status) && (
//                           <>
//                             <div className="timeline-item shipped">
//                               <span className="timeline-dot"></span>
//                               <span>Shipped</span>
//                               <span className="timeline-date">{formatDate(order.updatedAt)}</span>
//                             </div>
//                             {order.status === 'delivered' && (
//                               <div className="timeline-item delivered">
//                                 <span className="timeline-dot"></span>
//                                 <span>Delivered</span>
//                                 <span className="timeline-date">{formatDate(order.updatedAt)}</span>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default OrderHistory;
