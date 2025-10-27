// // src/backend/routes/recipeRoutes.js
// const express = require('express');
// const router  = express.Router();
// const Recipe  = require('../models/recipeModel');

// // 1) GET /api/recipes — Tüm tarifleri getir
// router.get('/', async (req, res) => {
//   try {
//     const list = await Recipe.find();
//     res.json(list);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 2) GET /api/recipes/:id — Belirli bir tarifi getir
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     if (!recipe) return res.status(404).json({ message: 'Tarif bulunamadı' });
//     res.json(recipe);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 3) POST /api/recipes — Yeni tarif oluştur
// router.post('/', async (req, res) => {
//   const newRecipe = new Recipe(req.body);
//   try {
//     const saved = await newRecipe.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // (İsteğe bağlı daha sonra) PUT ve DELETE endpoint’leri de ekleyebilirsin

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const Recipe = require('../models/recipeModel');
// const multer = require('multer');
// const path = require('path');


// router.post('/', /* upload.single('imgUrl'), */ async (req, res) => {
//   try {
//     const { name, category, ingredients, instructions, imgUrl } = req.body;
//     const recipe = await new Recipe({
//       name,
//       category,
//       ingredients,
//       instructions,
//       imgUrl
//     }).save();
//     res.status(201).json(recipe);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     res.json(await Recipe.find());
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const r = await Recipe.findById(req.params.id);
//     if (!r) return res.status(404).json({ error: 'Tarif bulunamadı!' });
//     res.json(r);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   try {
//     const u = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!u) return res.status(404).json({ error: 'Tarif bulunamadı!' });
//     res.json(u);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const d = await Recipe.findByIdAndDelete(req.params.id);
//     if (!d) return res.status(404).json({ error: 'Tarif bulunamadı!' });
//     res.json({ message: 'Tarif silindi' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel');

// Tarif ekleme
router.post('/', async (req, res) => {
  try {
    const { name, category, ingredients, instructions, imgUrl } = req.body;
    const recipe = await new Recipe({
      name,
      category,
      ingredients,
      instructions,
      imgUrl
    }).save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tarifları listele
router.get('/', async (req, res) => {
  try {
    res.json(await Recipe.find());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tek tarif getir
router.get('/:id', async (req, res) => {
  try {
    const r = await Recipe.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Tarif bulunamadı!' });
    res.json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tarif güncelle
router.put('/:id', async (req, res) => {
  try {
    const u = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!u) return res.status(404).json({ error: 'Tarif bulunamadı!' });
    res.json(u);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tarif sil
router.delete('/:id', async (req, res) => {
  try {
    const d = await Recipe.findByIdAndDelete(req.params.id);
    if (!d) return res.status(404).json({ error: 'Tarif bulunamadı!' });
    res.json({ message: 'Tarif silindi' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Yorum ekleme
router.post('/:id/comments', async (req, res) => {
  try {
    const { name, comment } = req.body;
    if (!name || !comment) return res.status(400).json({ error: 'Yorum için isim ve metin gerekli.' });

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Tarif bulunamadı!' });

    recipe.comments.push({ user: name, text: comment });
    await recipe.save();

    res.status(201).json(recipe.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;






