const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    const newProduct = new Product({ name, price, stock });
    await newProduct.save();
    
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateStock = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    if (product.stock < quantity) {
      return { success: false, message: 'Not enough stock' };
    }

    product.stock -= quantity;
    await product.save();
    return { success: true, message: 'Stock updated' };
  } catch (error) {
    return { success: false, message: 'Error updating stock', error };
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
