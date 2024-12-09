const Subscription = require('../models/subscriptionModel');

const calculateAmount = (tier, branches) => {
    const tierCost = { Starter: 1, Pro: 3, Enterprise: 5 };
    return tierCost[tier] + branches; // Base cost + £1 per branch
};

const calculateProratedAmount = (currentAmount, daysRemaining) => {
    const dailyRate = currentAmount / 30; // Assuming a 30-day billing cycle
    return dailyRate * daysRemaining;
};

class SubscriptionController {
    // Validate tier-specific product limits
    static validateProductLimit(tier, productCount) {
        const tierLimits = { Starter: 10, Pro: 100, Enterprise: Infinity };
        return productCount <= tierLimits[tier];
    }

    // Calculate remaining days in the billing cycle
    static calculateRemainingDays(nextBillingDate) {
        const now = new Date();
        const billingDate = new Date(nextBillingDate);
        const diffInMilliseconds = billingDate - now;
        return Math.max(Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24)), 0); // Ensure non-negative
    }

    static async createSubscription(req, res) {
        try {
            const { vendorId, tier, branches, productCount = 0 } = req.body;

            // Validate tier and branches
            if (!['Starter', 'Pro', 'Enterprise'].includes(tier)) {
                return res.status(400).json({ message: 'Invalid subscription tier' });
            }
            if (branches < 0) {
                return res.status(400).json({ message: 'Branch count must be positive' });
            }
            if (!this.validateProductLimit(tier, productCount)) {
                return res.status(400).json({ message: 'Product count exceeds tier limit' });
            }

            const amount = calculateAmount(tier, branches);

            const subscription = await Subscription.create({
                vendorId,
                tier,
                branches,
                amount,
                status: 'active', // Default status
                nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            });

            res.status(201).json({ message: 'Subscription created successfully', subscription });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating subscription', error: error.message });
        }
    }

    static async updateSubscription(req, res) {
        try {
            const { subscriptionId, tier, branches, productCount = 0 } = req.body;

            const subscription = await Subscription.findById(subscriptionId);
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }

            // Prevent updates to unpaid subscriptions
            if (subscription.status === 'unpaid') {
                return res.status(400).json({ message: 'Cannot update an unpaid subscription' });
            }

            // Validate inputs
            if (!['Starter', 'Pro', 'Enterprise'].includes(tier)) {
                return res.status(400).json({ message: 'Invalid subscription tier' });
            }
            if (branches < 0) {
                return res.status(400).json({ message: 'Branch count must be positive' });
            }
            if (!this.validateProductLimit(tier, productCount)) {
                return res.status(400).json({ message: 'Product count exceeds tier limit' });
            }

            // Calculate prorated refund if downgrading
            if (tier !== subscription.tier) {
                const daysRemaining = this.calculateRemainingDays(subscription.nextBillingDate);
                const proratedRefund = calculateProratedAmount(subscription.amount, daysRemaining);

                // Refund logic (replace with actual refund implementation)
                console.log(`Refunding £${proratedRefund.toFixed(2)} to vendor ${subscription.vendorId}`);
            }

            // Calculate new amount
            const amount = calculateAmount(tier, branches);

            // Update subscription details
            subscription.tier = tier;
            subscription.branches = branches;
            subscription.amount = amount;

            await subscription.save();

            res.status(200).json({ message: 'Subscription updated successfully', subscription });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating subscription', error: error.message });
        }
    }

    static async cancelSubscription(req, res) {
        try {
            const { id: subscriptionId } = req.params;

            const subscription = await Subscription.findById(subscriptionId);
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }

            const daysRemaining = this.calculateRemainingDays(subscription.nextBillingDate);
            if (subscription.status === 'active' && daysRemaining > 0) {
                const proratedRefund = calculateProratedAmount(subscription.amount, daysRemaining);

                // Refund logic
                console.log(`Refunding £${proratedRefund.toFixed(2)} to vendor ${subscription.vendorId}`);
            }

            subscription.status = 'canceled';
            await subscription.save();

            res.status(200).json({ message: 'Subscription canceled successfully', subscription });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error canceling subscription', error: error.message });
        }
    }
}

module.exports = SubscriptionController;
