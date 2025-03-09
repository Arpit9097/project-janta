const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { 
      category, 
      subCategory, 
      priceMin, 
      priceMax, 
      sort,
      page = 1,
      limit = 10
    } = req.query;

    // Build query
    const query = {};
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = priceMin;
      if (priceMax) query.price.$lte = priceMax;
    }

    // Build sort options
    let sortOptions = {};
    if (sort === 'price-asc') sortOptions.price = 1;
    if (sort === 'price-desc') sortOptions.price = -1;
    if (sort === 'newest') sortOptions.createdAt = -1;

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
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
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
}; 