require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

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
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('🚀 MongoDB connected successfully');
        app.listen(PORT, () => {
            console.log(`🔥 KYC Microservice live on port ${PORT}`);
        });
    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});