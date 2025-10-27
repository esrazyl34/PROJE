// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/tarifler" className="navbar-brand">
//           HOŞGELDİNİZ
//         </Link>
//       </div>
//       <div className="navbar-right">
//         {email ? (
//           <div className="user-info">
//             <span>{email}</span>
//             <button onClick={handleLogout} className="btn logout-btn">
//               Çıkış
//             </button>
//           </div>
//         ) : (
//           <div className="auth-links">
//             <Link to="/login" className="btn login-btn">
//               Giriş Yap
//             </Link>
//             <Link to="/register" className="btn register-btn">
//               Kaydol
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <Link to="/tarifler" className="navbar-brand">
//           HOŞGELDİNİZ
//         </Link>
//       </div>
//       <div className="navbar-right">
//         {email ? (
//           <>
//             <Link to="/favoriler" className="navbar-favorites-link" style={{marginRight: '15px'}}>
//               Favorilerim
//             </Link>
//             <div className="user-info">
//               <span>{email}</span>
//               <button onClick={handleLogout} className="btn logout-btn">
//                 Çıkış
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="auth-links">
//             <Link to="/login" className="btn login-btn">
//               Giriş Yap
//             </Link>
//             <Link to="/register" className="btn register-btn">
//               Kaydol
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";  // react-icons'dan kalp ikonu
import "./Navbar.css";
import { FaUtensils } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/tarifler" className="navbar-brand">
        <FaUtensils className="brand-icon" />
          <span className="brand-text">HOŞGELDİNİZ</span>
        </Link>
      </div>
      <div className="navbar-right">
        {email ? (
          <>
            <Link to="/favoriler" className="navbar-favorites-link" style={{ marginRight: '15px' }}>
              <FaHeart className="heart-icon" />
              Favorilerim
            </Link>
            <div className="user-info">
              <span>{email}</span>
              <button onClick={handleLogout} className="btn logout-btn">
                Çıkış
              </button>
            </div>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn login-btn">
              Giriş Yap
            </Link>
            <Link to="/register" className="btn register-btn">
              Kaydol
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;



 


