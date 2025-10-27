const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Bu e-posta zaten kayıtlı.' });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Kayıt başarılı, giriş yapabilirsiniz.' });
  } catch (err) {
    console.error('Kayıt hatası:', err); // tüm hatayı göster

    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, email: user.email });
  } catch (err) {
    console.error('Giriş hatası:', err.message);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
});

module.exports = router;














