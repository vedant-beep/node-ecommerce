const express = require('express');
const { createProduct, getProducts, getProductById, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createProduct); 
router.get('/', getProducts); 
router.get('/:id', getProductById); 
router.delete('/:id', auth, deleteProduct); 
module.exports = router;
