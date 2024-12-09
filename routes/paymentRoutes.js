const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/paymentsController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createPayment', authMiddleware, PaymentController.createPayment);
router.get('/fetchingPayments', authMiddleware, PaymentController.fetchingPayments);
router.get('/fetchingOnePayment/:id', authMiddleware, PaymentController.fetchingOnePayment);
router.patch('/updatePayment/:id', authMiddleware, PaymentController.updatePayment);
router.delete('/deletePayment/:id', authMiddleware, PaymentController.deletePayment);

module.exports = router;