const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const Subscription = sequelize.define('Subscriptions', {
    vendorId: Sequelize.STRING,
    tier: Sequelize.STRING,
    branches: Sequelize.STRING,
    amount: Sequelize.NUMBER,
    status: Sequelize.NUMBER,
    productCount: Sequelize.NUMBER,
    nextBillingDate:Sequelize.STRING,
    isTrial: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
});

module.exports = Subscription;