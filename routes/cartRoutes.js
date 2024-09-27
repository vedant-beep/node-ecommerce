const express = require('express');
const { addToCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/add-to-cart', auth, addToCart);

module.exports = router;
