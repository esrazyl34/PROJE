import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TarifEkle.css';

const TarifEkle = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      category,
      ingredients: ingredients.split('\n'), // Her satırı ayrı malzeme olarak kaydet
      instructions: instructions.split('\n'), // Her satırı ayrı adım olarak kaydet
      imgUrl,
    };

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/recipes', newRecipe, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Tarif başarıyla eklendi!');
      setTimeout(() => {
        navigate('/tarifler');
      }, 500);
    } catch (err) {
      setMessage('Bir hata oluştu!');
      console.error(err);
    }
  };

  return (
    <div className="tarif-ekle-container">
      <h1>Tarif Ekle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tarif Adı:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value=""></option>
            <option value="Ana Yemek">Ana Yemek</option>
            <option value="İçecek">İçecek</option>
            <option value="Ara Sıcak">Ara Sıcak</option>
            <option value="Hamur İşleri">Hamur İşleri</option>
            <option value="Tatlı">Tatlı</option>
            <option value="Salata">Salata</option>
            <option value="Çorba">Çorba</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Malzemeler:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Yapılışı:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imgUrl">Resim URL'si:</label>
          <input
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit">Tarifi Ekle</button>
      </form>

      {message && (
        <div className={message.includes('başarıyla') ? 'success' : 'error'}>
          {message}
        </div>
      )}
    </div>
  );
};

export default TarifEkle;
