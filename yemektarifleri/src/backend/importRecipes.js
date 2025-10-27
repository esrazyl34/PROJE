const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Recipe = require('./models/recipeModel'); // modelin doğru dosya yolunu yaz

dotenv.config();

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB bağlantısı başarılı');
    importData();
  })
  .catch((err) => {
    console.error('❌ MongoDB bağlantı hatası:', err);
  });

// JSON dosyasından veriyi oku ve veritabanına ekle
const importData = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('./recipes.json', 'utf-8'));
    await Recipe.insertMany(data);
    console.log('🍽️ Tarifler başarıyla yüklendi!');
    process.exit(); // işlem bitince scripti kapat
  } catch (error) {
    console.error('❌ Tarif yükleme hatası:', error);
    process.exit(1);
  }
};
