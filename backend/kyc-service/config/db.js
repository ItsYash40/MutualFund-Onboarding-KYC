const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Mongoose connection attempt
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('🚀 MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Agar DB connect nahi hua toh server crash kar do taaki pata chal jaye
    }
};

module.exports = connectDB;