const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders.controller');

router.post('/order', orders.postOrder);
router.get('/order', orders.getOrder);

module.exports = router;