const mongoose = require('mongoose');

// Yorumlar için alt şema
const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  imgUrl: { type: String, required: true },
  comments: [commentSchema] // 👈 Yorumları buraya ekledik
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);







