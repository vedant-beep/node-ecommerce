const mongoose = require('mongoose');
// require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://0.0.0.0:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
