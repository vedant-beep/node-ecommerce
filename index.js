const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
