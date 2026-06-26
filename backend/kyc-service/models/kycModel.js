const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true,
        unique: true // Ek user ek hi baar KYC karega
    },
    panNumber: { 
        type: String, 
        required: true 
    },
    aadharDetails: {
        name: String,
        dob: String,
        address: String
    },
    kycStatus: { 
        type: String, 
        enum: ['PENDING', 'DRAFT', 'COMPLETED', 'REJECTED'],
        default: 'PENDING'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('KycRecord', kycSchema);