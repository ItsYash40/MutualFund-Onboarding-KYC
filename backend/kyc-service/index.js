require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const kycRoutes = require('./routes/kycRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 4002;

// ================= MIDDLEWARES =================
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ================= ROUTES =================
app.use('/api/kyc', kycRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('KYC Microservice is up and running!');
});

// ================= DB & SERVER =================
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🔥 KYC Microservice live on port ${PORT}`);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});