const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
