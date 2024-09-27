const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;  

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
        totalPrice: product.price * quantity
      });
    } else {
      const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

      if (productIndex >= 0) {
        cart.items[productIndex].quantity += quantity;
        cart.totalPrice += product.price * quantity;
      } else {
        cart.items.push({ product: productId, quantity });
        cart.totalPrice += product.price * quantity;
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
