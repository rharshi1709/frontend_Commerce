import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Success function - save both token & user info
  const onSuccess = (token, userEmail) => {
    Cookies.set("jwt_token", token, { expires: 30 });

    // ✅ Save user details (so CartContext can use the email)
    localStorage.setItem("user", JSON.stringify({ email: userEmail }));

    navigate("/", { replace: true });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      const userDetails = { email, password };
      const url = "https://backend-commerce-1.onrender.com/api/login";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const res = await fetch(url, options);
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        // ✅ Assuming backend returns { token, user: { email } }
        const token = data.token;
        const userEmail = data.user?.email || email; // fallback if backend doesn't return it
        onSuccess(token, userEmail);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error or server is not responding");
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-form-container">
      <div className="login-card">
        <h1 className="login-title">Login Form</h1>
        <form onSubmit={onSubmitForm}>
          <div className="login-item">
            <label htmlFor="email" className="login-label">EMAIL</label>
            <input
              className="login-input"
              id="email"
              value={email}
              type="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-item">
            <label htmlFor="pass" className="login-label">PASSWORD</label>
            <input
              className="login-input"
              id="pass"
              value={password}
              type="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="login-note">
            If you don't have an account? Please Register.
          </p>

          <div className="login-buttons">
            <button type="submit" className="login-button">Submit</button>
            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/register", { replace: true })}
            >
              Register
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
