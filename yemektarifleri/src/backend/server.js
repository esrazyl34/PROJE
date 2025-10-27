const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => { 
    console.error('❌ MongoDB bağlantı hatası:', err); 
    process.exit(1); 
  });

// Route dosyaları
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');
const commentRoutes = require('./routes/commentRoutes'); // 

// Kullanılan rotalar
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/comments', commentRoutes); // 

// Ana endpoint
app.get('/', (req, res) => res.send('🚀 API çalışıyor!'));

// Sunucu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`));
