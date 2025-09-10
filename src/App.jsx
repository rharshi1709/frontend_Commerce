import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import RegisterForm from './components/Register/RegisterForm'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import DetailedView from './components/DetailedView/DetailedView'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart.jsx'
import { CartProvider } from './components/CartContext.jsx' // Import CartProvider
import Payment from './components/Payment.jsx'

function App() {
  return (
    <CartProvider> {/* Wrap entire app in CartProvider */}
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProtectedRoute><DetailedView /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> {/* Added Cart route */}
      <Route path="/payment" element={<ProtectedRoute><Payment/></ProtectedRoute>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  )
}

export default App
