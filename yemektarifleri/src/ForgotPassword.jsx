import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.tempPassword) {
        setTempPassword(data.tempPassword);  // Geçici şifreyi al ve göster
      } else {
        alert("Bir hata oluştu veya kullanıcı bulunamadı.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Şifremi Unuttum</h2>
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
          <button type="submit" className="submit-button">Geçici Şifreyi Gönder</button>
        </form>

        {tempPassword && (
          <div>
            <h3>Geçici Şifreniz:</h3>
            <p>{tempPassword}</p>
            <p>Bu şifreyi kullanarak giriş yapabilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;


