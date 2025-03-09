const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

// Product routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', protect, admin, productController.createProduct);
router.put('/products/:id', protect, admin, productController.updateProduct);

// Order routes
router.post('/orders', protect, orderController.createOrder);
router.get('/orders/:id', protect, orderController.getOrderById);
router.put('/orders/:id/pay', protect, orderController.updateOrderToPaid);

module.exports = router; 