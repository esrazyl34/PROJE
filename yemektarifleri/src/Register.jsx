import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true); // Başlangıçta yükleniyor durumu

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      if (res.status === 201) {
        setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Kayıt hatası:", err);
      setError(err.response?.data?.message || "Kayıt başarısız.");
    } finally {
      setIsLoading(false); // İşlem bitince loading durumu sonlanır
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Kayıt Ol</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Şifre:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Kayıt Oluyor..." : "Kayıt Ol"}
          </button>
        </form>
        <div className="links">
          <a href="/login">Zaten hesabın var mı? Giriş yap</a>
        </div>
      </div>
    </div>
  );
}

export default Register;

