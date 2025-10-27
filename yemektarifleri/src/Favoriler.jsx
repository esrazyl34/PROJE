import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Favoriler = () => {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:5000/api/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setFavorites(res.data))
    .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Lütfen giriş yapınız.</p>;

  return (
    <div>
      <h2>Favori Tariflerim</h2>
      {favorites.length === 0 && <p>Henüz favori tarif eklenmedi.</p>}
      <div className="tarif-cards">
        {favorites.map(recipe => (
          <div className="tarif-card" key={recipe._id}>
            <img src={recipe.imgUrl} alt={recipe.name} className="tarif-card-img" />
            <div className="tarif-card-content">
              <h3>
                <Link to={`/tarifler/${recipe._id}`} style={{ textDecoration: 'none', color: '#6a0dad' }}>
                  {recipe.name}
                </Link>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoriler;

