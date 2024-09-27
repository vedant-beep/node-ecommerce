const express = require('express');
const { placeOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/place-order', auth, placeOrder);
router.get('/orders', auth, getOrders);

module.exports = router;
