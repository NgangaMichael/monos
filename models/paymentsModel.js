const Sequelize = require('sequelize');
const { sequelize } = require('../database/dbSetup');

const Payment = sequelize.define('Payments', {
    vendorId: Sequelize.STRING,
    amount: Sequelize.NUMBER,
    transactionId: Sequelize.STRING
});

module.exports = Payment;