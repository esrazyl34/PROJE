
// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      // Başarılıysa token ve email'i sakla
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      // Tarifler sayfasına yönlendir
      navigate("/tarifler");
    } catch (err) {
      setError(
        err.response?.data?.message || "Giriş başarısız. Bilgileri kontrol et."
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Giriş Yap
        </button>
        <Link to="/register" className="register-link-button">
             Hesabın yok mu ?  Hemen Kaydol !
        </Link>

      </form>
    </div>
  );
}

export default Login;










