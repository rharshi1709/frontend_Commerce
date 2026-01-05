import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 🔹 react-hot-toast

import Home from './components/Home/Home';
import RegisterForm from './components/Register/RegisterForm';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import NotFound from './components/NotFound/NotFound';
import Products from './components/Products/Products';
import DetailedView from './components/DetailedView/DetailedView';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Cart from './components/Cart.jsx';
import { CartProvider } from './components/CartContext.jsx';
import Payment from './components/Payment.jsx';
import Login from './components/Login/Login.jsx';
import OrderHistory from './components/OrderHistory/OrderHistory';
import UserProfile from './components/UserProfile/UserProfile';
import Wishlist from './components/Wishlist/Wishlist';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <CartProvider>
      {/* Hot Toast Container */}
      <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  toastOptions={{
    duration: 2000,
    style: {
      fontSize: '15px',
      background: '#1f2937', // darker gray
      color: '#f9fafb',       // off-white text
      borderRadius: '8px',    // smoother corners
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)', // more depth
      padding: '12px 16px',   // slightly bigger padding
      maxWidth: '350px',
      
    },
  }}
/>


      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><DetailedView /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
