import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/login', { replace: true });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const userDetails = { username, password, email };
      const res = await fetch('https://backend-commerce-1.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        onSuccess();
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="register-form-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <form onSubmit={onSubmitForm}>
          <div className="register-item">
            <label htmlFor="username" className="register-label">USERNAME</label>
            <input
              className="register-input"
              id="username"
              type="text"
              value={username}
              required
              autoComplete="off"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="register-item">
            <label htmlFor="password" className="register-label">PASSWORD</label>
            <input
              className="register-input"
              id="password"
              type="password"
              value={password}
              require
              autoComplete="off"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register-item">
            <label htmlFor="email" className="register-label">EMAIL</label>
            <input
              className="register-input"
              id="email"
              type="email"
              value={email}
              required
              autoComplete="off"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
 <p className='login-error'>If you have already Registered? Please Login</p>
          <div className="register-buttons">
            <button type="submit" className="register-button">Submit</button>
           
            <button
              type="button"
              className="register-button"
              onClick={() => navigate('/login', { replace: true })}
            >
              Login
            </button>
          </div>

          {error && <p className="register-error">{error}</p>}
          
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
