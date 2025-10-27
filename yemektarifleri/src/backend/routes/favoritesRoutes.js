const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Recipe = require('../models/recipeModel');
const jwt = require('jsonwebtoken');

// Middleware: Token doğrulama
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Favorilere tarif ekle
router.post('/add', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    if (user.favorites.includes(recipeId)) {
      return res.status(400).json({ message: 'Zaten favorilere eklenmiş.' });
    }

    user.favorites.push(recipeId);
    await user.save();

    res.json({ message: 'Favorilere eklendi.' });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Favorilerden tarif çıkar
router.post('/remove', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ message: 'Favorilerden çıkarıldı.' });
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Kullanıcının favorilerini getir
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate('favorites');
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;
