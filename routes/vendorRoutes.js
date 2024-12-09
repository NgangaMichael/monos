const express = require('express');
const router = express.Router();
const VendorController = require('../controller/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createVendor', authMiddleware, VendorController.createVendor);
router.get('/fetchingVendors', authMiddleware, VendorController.fetchingVendors);
router.get('/fetchingOneVendor/:id', authMiddleware, VendorController.fetchingOneVendor);
router.patch('/updateVendor/:id', authMiddleware, VendorController.updateVendor);
router.delete('/deleteVendor/:id', authMiddleware, VendorController.deleteVendor);

module.exports = router;