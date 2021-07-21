const mongoose = require('mongoose');

const productShema = new mongoose.Schema({
  id: { type: String},
  title: { type: String, required: true},
  price: { type: String, required: true},
  content: { type: String, required: true},
  category: { type: String, required: true},
  pieces: {type: String},
  images: {type: Array}
});

module.exports = mongoose.model('Product', productShema);