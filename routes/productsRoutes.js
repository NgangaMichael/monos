const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createProduct', authMiddleware, ProductController.createProduct);
router.get('/fetchingProducts', authMiddleware, ProductController.fetchingProducts);
router.get('/fetchingOneProduct/:id', authMiddleware, ProductController.fetchingOneProduct);
router.patch('/updateProduct/:id', authMiddleware, ProductController.updateProduct);
router.delete('/deleteProduct/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;