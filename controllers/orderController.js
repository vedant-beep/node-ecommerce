const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const order = new Order({ userId: user._id, items, totalAmount });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    const orderItems = [];
    for (let item of cart.items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Product ${product.name} does not have enough stock. Available: ${product.stock}`
        });
      }
      product.stock -= item.quantity;
      await product.save();
      orderItems.push({ product: product._id, quantity: item.quantity });
    }
    const order = new Order({
      userId: userId,
      items: orderItems,
      totalAmount: cart.totalPrice, 
      status: 'Processing',
      date: Date.now(),
    });

    const createdOrder = await order.save();
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(201).json({ message: 'Order placed successfully', order: createdOrder });
  } catch (error) {
    console.error('Error during checkout:', error);
    return res.status(500).json({ message: 'Server error during checkout' });
  }
};
