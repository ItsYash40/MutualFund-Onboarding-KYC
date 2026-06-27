const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true,
        unique: true 
    },
    panNumber: { 
        type: String, 
        required: true 
    },
    panImageUrl: { 
        type: String // OCR image read karne ke liye iski zaroorat padegi
    },
    aadharDetails: {
        name: String,
        dob: String,
        address: String
    },
    kycStatus: { 
        type: String, 
        // 'APPROVED' status add kiya hai admin ke liye
        enum: ['PENDING', 'DRAFT', 'COMPLETED', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    adminRemarks: {
        type: String // Reject hone par Admin reason yahan daalega
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('KycRecord', kycSchema);
