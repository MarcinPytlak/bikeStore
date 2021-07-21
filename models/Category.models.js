const mongoose = require('mongoose');

const categoryShema = new mongoose.Schema({
  id: { type: String, required: true},
  name: { type: String, required: true},
});

module.exports = mongoose.model('Category', categoryShema);