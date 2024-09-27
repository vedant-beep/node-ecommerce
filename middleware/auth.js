const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // console.log('token ',token);
    // console.log('process.env.JWT_SECRET ',process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decoded.user ',decoded.user);
    // console.log('req.user ',req.user);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('err ',err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
