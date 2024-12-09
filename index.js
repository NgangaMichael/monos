const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./database/dbSetup.js');
const dotenv = require('dotenv');
const paymentRoute = require('./routes/paymentRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
const subscriptionRoutes = require('./routes/subscriptionRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const vendorRoutes = require('./routes/vendorRoutes.js');

// set up a env file on root directory after cloning the project 
dotenv.config();
connectToDatabase();

const corsOptions = { origin: process.env.CLIENT_URL };

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(paymentRoute);
app.use(productsRoutes);
app.use(subscriptionRoutes);
app.use(userRoutes);
app.use(vendorRoutes);

app.listen(process.env.API_PORT, () => {
  console.log(`Server listening on port ${process.env.API_PORT}`);
});