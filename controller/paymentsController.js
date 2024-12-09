const Payment = require('../models/paymentsModel');

class PaymentController {
    static async createPayment(req, res) {
        try {
            const { vendorId, amount, transactionId } = req.body;
            const newExpense = await Payment.create({ vendorId, amount, transactionId });
            res.status(200).json({ message: 'New Payment created Successfully', Payment: newExpense });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Payment', error: error.message });
        }
    }

    static async fetchingPayments(req, res) {
        try {
            const payments = await Payment.findAll();
            res.json(payments);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching all Payments', error: error.message });
        }
    }

    static async fetchingOnePayment(req, res) {
        try {
            const { id } = req.params;
            const payment = await Payment.findByPk(id);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching one Payment', error: error.message });
        }
    }

    static async updatePayment(req, res) {
        try {
            const { id } = req.params;
            const { vendorId, amount, transactionId } = req.body;

            const [updatedCount] = await Payment.update({ vendorId, amount, transactionId }, { where: { id } });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Payment not found for updating' });
            }

            res.status(200).json({ message: 'Payment Updated Successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Payment', error: error.message });
        }
    }

    static async deletePayment(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await Payment.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Payment not found for deleting' });
            }

            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Payment', error: error.message });
        }
    }
}

module.exports = PaymentController;