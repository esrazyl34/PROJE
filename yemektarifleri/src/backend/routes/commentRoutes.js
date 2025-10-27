// routes/commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Yeni yorum ekleme
router.post('/', async (req, res) => {
  try {
    const { recipeId, name, text } = req.body;
    const newComment = new Comment({ recipeId, name, text });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Yorum eklenemedi.', error: err.message });
  }
});

// Belirli bir tarifin yorumlarını alma
router.get('/:recipeId', async (req, res) => {
  try {
    const comments = await Comment.find({ recipeId: req.params.recipeId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Yorumlar alınamadı.', error: err.message });
  }
});

module.exports = router;
