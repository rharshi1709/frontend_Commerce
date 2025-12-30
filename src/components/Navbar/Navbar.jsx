import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { CartContext } from '../CartContext.jsx'; // Import CartContext
import { FaShoppingCart, FaUser, FaHeart, FaClipboardList } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // Toggle for mobile nav
  const { cart } = useContext(CartContext); // Access cart

  // Calculate total items in cart
  const totalItems = cart.length

  function logout() {
    Cookies.remove('jwt_token');
    navigate('/login', { replace: true });
  }

  return (
    <div className="navbar">
      <Link className="logo" to="/">ShopEasy</Link>
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>

      {/* Links (toggle class for mobile) */}
      <div className={`nav-links ${open ? 'active' : ''}`}>
        <Link className="link" to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link className="link" to="/products" onClick={() => setOpen(false)}>
          Products
        </Link>
        <Link className="link" to="/about" onClick={() => setOpen(false)}>
          AboutUs
        </Link>
        <Link className="link" to="/contact" onClick={() => setOpen(false)}>
          ContactUs
        </Link>

        <Link className="link" to="/wishlist" title="Wishlist" onClick={() => setOpen(false)}>
          <FaHeart />
        </Link>

        <Link className="link" to="/orders" title="Orders" onClick={() => setOpen(false)}>
          <FaClipboardList />
        </Link>

        <Link className="link" to="/profile" title="Profile" onClick={() => setOpen(false)}>
          <FaUser />
        </Link>

        {/* Cart link with icon and item count */}
        <Link className="link cart-link" to="/cart" onClick={() => setOpen(false)}>
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        <button onClick={logout} className="button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
