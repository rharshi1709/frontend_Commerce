import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";
import API_BASE_URL from "../../config.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Store JWT safely for Vercel
      Cookies.set("jwt_token", data.jwToken, {
        expires: 30,
        secure: true,      // required for https (Vercel)
        sameSite: "None",  // required for cross-site
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError("Server not responding");
      console.error(err);
    }
  };

  const token = Cookies.get("jwt_token");
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-form-container">
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
