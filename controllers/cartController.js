const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(productId);

    if (!product || product.stock < quantity) {
      return res.status(400).json({ message: 'Product unavailable' });
    }

    user.cart.push({ productId, quantity });
    await user.save();

    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
