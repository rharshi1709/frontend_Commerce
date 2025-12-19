import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About ShopEasy</h3>
          <p>
            Your trusted online shopping destination for quality products at great prices. 
            We're committed to providing excellent customer service and fast delivery.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          <ul>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><a href="#support">Customer Support</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Return Policy</a></li>
          </ul>
        </div>

       
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
