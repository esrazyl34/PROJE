// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';  // Link sadece bir kez import edilmelidir
// import './Tarifler.css';

// const Tarifler = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [category, setCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/recipes')
//       .then(res => setRecipes(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const filteredRecipes = recipes.filter(recipe => {
//     const matchesCategory = category ? recipe.category === category : true;
//     const matchesSearchTerm = recipe.name.toLowerCase().includes(searchTerm);
//     return matchesCategory && matchesSearchTerm;
//   });

//   return (
//     <div className="tarifler-container">
//       <h1>MUHTEŞEM YEMEK TARİFLERİ</h1>

//       {/* Kategori */}
//       <div className="category-select">
//         <label htmlFor="category">Kategori Seçin: </label>
//         <select id="category" onChange={e => setCategory(e.target.value)}>
//           <option value="">Tümü</option>
//           <option value="Ana Yemek">Ana Yemek</option>
//           <option value="İçecek">İçecek</option>
//           <option value="Ara Sıcak">Ara Sıcak</option>
//           <option value="Hamur İşleri">Hamur İşleri</option>
//           <option value="Tatlı">Tatlı</option>
//           <option value="Salata">Salata</option>
//           <option value="Çorba">Çorba</option>
//         </select>
//       </div>

//       {/* Arama */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Hangi tarifi arıyorsun?.."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value.toLowerCase())}
//         />
//       </div>

//       {/* Tarife Ekleme Linki */}
//       <div className="add-recipe">
//         <Link to="/tarif-ekle">
//           <button className="add-recipe-btn">Tarif Ekle</button>
//         </Link>
//       </div>

//       {/* Tarif Kartları */}
//       <div className="tarif-cards">
//         {filteredRecipes.map(recipe => (
//           <div className="tarif-card" key={recipe._id}>
//             <img src={recipe.imgUrl} alt={recipe.name} className="tarif-card-img" />
//             <div className="tarif-card-content">
//               <h3 className="tarif-card-title">
//                 <Link to={`/tarifler/${recipe._id}`} style={{ textDecoration: 'none', color: '#6a0dad' }}>
//                   {recipe.name}
//                 </Link>
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tarifler;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Tarifler.css';

const Tarifler = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  // Tarifleri çek
  useEffect(() => {
    axios.get('http://localhost:5000/api/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Kullanıcının favorilerini çek
  useEffect(() => {
    if (!token) return; // giriş yoksa favori yok
    axios.get('http://localhost:5000/api/favorites', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      // Favori id'leri string olarak sakla
      const favIds = res.data.map(fav => String(fav._id));
      setFavorites(favIds);
      console.log('Favoriler yüklendi:', favIds);
    })
    .catch(err => console.error(err));
  }, [token]);

  // Favori butonuna basılınca toggle fonksiyonu
  const toggleFavorite = (recipeId) => {
    if (!token) {
      alert('Lütfen favori eklemek için giriş yapınız!');
      return;
    }

    const idStr = String(recipeId); // stringe çevir
    const isFav = favorites.includes(idStr);
    const url = isFav ? 'remove' : 'add';

    console.log(`${isFav ? 'Favoriden çıkarılıyor:' : 'Favoriye ekleniyor:'}`, idStr);

    axios.post(`http://localhost:5000/api/favorites/${url}`, { recipeId: idStr }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setFavorites(prev => 
        isFav 
          ? prev.filter(id => id !== idStr) 
          : [...prev, idStr]
      );
    })
    .catch(err => console.error(err));
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = category ? recipe.category === category : true;
    const matchesSearchTerm = recipe.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });

  console.log('Şu anki favoriler:', favorites);

  return (
    <div className="tarifler-container">
      <h1>MUHTEŞEM YEMEK TARİFLERİ</h1>

      {/* Kategori */}
      <div className="category-select">
        <label htmlFor="category">Kategori Seçin: </label>
        <select id="category" onChange={e => setCategory(e.target.value)}>
          <option value="">Tümü</option>
          <option value="Ana Yemek">Ana Yemek</option>
          <option value="İçecek">İçecek</option>
          <option value="Ara Sıcak">Ara Sıcak</option>
          <option value="Hamur İşleri">Hamur İşleri</option>
          <option value="Tatlı">Tatlı</option>
          <option value="Salata">Salata</option>
          <option value="Çorba">Çorba</option>
        </select>
      </div>

      {/* Arama */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Hangi tarifi arıyorsun?.."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      {/* Tarife Ekleme Linki */}
      <div className="add-recipe">
        <Link to="/tarif-ekle">
          <button className="add-recipe-btn">Tarif Ekle</button>
        </Link>
      </div>

      {/* Tarif Kartları */}
      <div className="tarif-cards">
        {filteredRecipes.map(recipe => {
          const isFavorited = favorites.includes(String(recipe._id));
          return (
            <div className="tarif-card" key={recipe._id}>
              <img src={recipe.imgUrl} alt={recipe.name} className="tarif-card-img" />
              <div className="tarif-card-content">
                <h3 className="tarif-card-title">
                  <Link to={`/tarifler/${recipe._id}`} style={{ textDecoration: 'none', color: '#6a0dad' }}>
                    {recipe.name}
                  </Link>
                </h3>

                {/* Favori Butonu */}
                <button 
                  className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(recipe._id)}
                  aria-label={isFavorited ? 'Favoriden çıkar' : 'Favoriye ekle'}
                >
                  {isFavorited ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tarifler;
