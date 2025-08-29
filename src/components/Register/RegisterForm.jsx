import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate ,Navigate } from 'react-router-dom';  // ✅ Correct import
import Cookies from 'js-cookie'
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/login', { replace: true }); // ✅ Redirect to login after register
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const userDetails = { username, password, email };
      const res = await fetch('https://backend-commerce-1.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
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
 const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
  if (jwtToken !== undefined) {
  return <Navigate to="/" replace />
  }

  return (
    <div className="form">
  
      <div className="card">
        <h1>Register Form</h1>
        <form onSubmit={onSubmitForm}>
          <div className="item">
            <label htmlFor="name">USERNAME</label>
            <input
              className="input"
              value={username}
              id="name"
              type="text"
              required
              autoComplete="off"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="pass">PASSWORD</label>
            <input
              className="input"
              id="pass"
              value={password}
              type="password"
              required
              autoComplete="off"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="email">EMAIL</label>
            <input
              className="input"
              id="email"
              value={email}
              type="email"
              required
              autoComplete="off"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
           
          </div>
           <p>If you already registered ? please Login</p>
          <div className='buttons'>
            <button type="submit">Submit</button>
            <button     type="button"  onClick={()=>{
              navigate('/login',{replace:true})
            }}>Login</button>
          </div>
          <p className="error">{error}</p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
