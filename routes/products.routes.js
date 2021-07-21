const express = require('express');
const router = express.Router();

const products = require('../controllers/products.controller');

router.get('/products', products.getAllProducts);
router.get(`/products/:id`, products.getProductById);

module.exports = router;