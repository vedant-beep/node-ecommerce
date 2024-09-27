const monthlyAnalysis = await Order.aggregate([
    { $match: { date: { $gte: new ISODate("2023-01-01"), $lt: new ISODate("2024-01-01") } }},
    { $group: { _id: { $month: "$date" }, totalOrders: { $sum: 1 }, totalRevenue: { $sum: "$totalPrice" }}},
    { $sort: { _id: 1 }}
  ]);
  