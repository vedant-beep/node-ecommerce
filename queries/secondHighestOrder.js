const secondHighestOrder = await Order.find({})
  .sort({ totalPrice: -1 })
  .skip(1)
  .limit(1);
