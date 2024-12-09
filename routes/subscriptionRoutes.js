const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controller/suvscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createSubscription', authMiddleware, SubscriptionController.createSubscription);
router.patch('/updateSubscription', authMiddleware, SubscriptionController.updateSubscription);
router.delete('/cancelSubscription/:id', authMiddleware, SubscriptionController.cancelSubscription);

module.exports = router;