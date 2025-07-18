const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

/**
 * Routes
 */
const customerRoute = require('./Routes/customerRoutes')

const app = express();

/**
 * Middlewares
 */
app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

/*
 * Connect to MongoDB
 */
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.error(err);
});

/*
 * Routes
 */
app.use('/', customerRoute)

/*
 * Start Server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})
module.exports = app;


