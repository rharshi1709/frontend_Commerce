import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';  // make sure to create this file

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSuccess = (token) => {
        Cookies.set('jwt_token', token, { expires: 30 });
        navigate("/", { replace: true });
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const userDetails = { email, password };
            const url = 'https://backend-commerce-1.onrender.com/api/login';
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userDetails),
            };
            const res = await fetch(url, options);
            const data = await res.json();
            if (res.ok) {
                const token = data.jwToken;
                onSuccess(token);
            } else {
                setError(data?.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            alert(err);
        }
    }

    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
        return <Navigate to="/" replace />
    }

    return (
        <div className='login-form-container'>
            <div className='login-card'>
                <h1 className='login-title'>Login Form</h1>
                <form onSubmit={onSubmitForm}>
                    <div className='login-item'>
                        <label htmlFor="email" className='login-label'>EMAIL</label>
                        <input
                            className='login-input'
                            id="email"
                            value={email}
                            type="email"
                            required
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='login-item'>
                        <label htmlFor="pass" className='login-label'>PASSWORD</label>
                        <input
                            className='login-input'
                            id="pass"
                            value={password}
                            type="password"
                            required
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className='login-error'>If you don't have an account? Please Register.</p>

                    <div className='login-buttons'>
                        <button type="submit" className='login-button'>Submit</button>
                        <button
                            type="button"
                            className='login-button'
                            onClick={() => navigate('/register', { replace: true })}
                        >
                            Register
                        </button>
                    </div>

                    {error && <p className='login-error'>{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
