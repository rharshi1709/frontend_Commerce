import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie'
function Navbar() {
  const navigate=useNavigate()
  const [open, setOpen] = useState(false); // Toggle for mobile nav
 
function logout(){
    Cookies.remove('jwt_token')
    navigate('/login',{replace:true })

}


  return (
    <div className="navbar">
     <h2>ShopEasy</h2>
     <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
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
        <button onClick={logout} className="button" >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
