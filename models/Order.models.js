const { Mixed, Schema } = require('mongoose');
const mongoose = require('mongoose');

const orderShema = new mongoose.Schema({
  id: { type: String},
  name: { type: String, required: true},
  surname: { type: String, required: true},
  email: { type: Mixed, required: true},
  phone: { type: String, required: true},
  address: { type: String, required: true},
  address2: { type: String},
  city: { type: String, required: true},
  postalCode: { type: String, required: true},
  orderData: {type: Array, required: true},
  finalAmount: {type: Number, required: true}
});

module.exports = mongoose.model('Order', orderShema);