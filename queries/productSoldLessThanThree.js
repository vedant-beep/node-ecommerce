const unsoldProducts = await Product.aggregate([
    { $lookup: { from: "orders", localField: "_id", foreignField: "items.product", as: "orderDetails" }},
    { $unwind: "$orderDetails" },
    { $match: { "orderDetails.date": { $gte: new ISODate("2023-10-01"), $lt: new ISODate("2024-01-01") }}},
    { $group: { _id: "$_id", totalSold: { $sum: "$orderDetails.items.quantity" }}},
    { $match: { totalSold: { $lt: 3 }}}
  ]);
  