const Order = require('../models/Order');
const User = require('../models/User');

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
