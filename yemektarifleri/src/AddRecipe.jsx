import React, { useState } from 'react';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      category,
      ingredients: ingredients.split(','),
      instructions,
      imgUrl,
    };

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Tarif başarıyla eklendi!');
        // Burada yönlendirme veya formu sıfırlama işlemleri yapabilirsiniz
      } else {
        alert('Bir hata oluştu!');
      }
    } catch (error) {
      console.error(error);
      alert('Bir hata oluştu!');
    }
  };

  return (
    <div>
      <h2>Yeni Tarif Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tarif Adı:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Malzemeler (virgülle ayırın):</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tarif Talimatları:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resim URL'si:</label>
          <input
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tarifi Ekle</button>
      </form>
    </div>
  );
};

export default AddRecipe;
