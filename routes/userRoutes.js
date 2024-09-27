const express = require('express');
const { signup, login,logout } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',auth, logout);

module.exports = router;
