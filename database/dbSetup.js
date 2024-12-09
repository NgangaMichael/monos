const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: console.log,
    }
);

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB');
    } catch (err) {
        console.error('Error connecting to DB', err);
    }
};

module.exports = { sequelize, connectToDatabase };