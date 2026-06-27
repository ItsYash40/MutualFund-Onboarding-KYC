const KycRecord = require('../models/kycModel');

// 1. FINAL SUBMIT (Purana wala jo galti se delete ho gaya tha)
exports.finalSubmit = async (req, res) => {
    try {
        const { userId, panNumber, aadharData } = req.body;

        if (!userId || !panNumber || !aadharData) {
            return res.status(400).json({ success: false, message: 'Incomplete payload.' });
        }

        const existingRecord = await KycRecord.findOne({ userId });
        if (existingRecord && existingRecord.kycStatus === 'COMPLETED') {
            return res.status(400).json({ success: false, message: 'KYC already completed.' });
        }

        const newKyc = new KycRecord({
            userId, panNumber, aadharDetails: aadharData, kycStatus: 'COMPLETED'
        });

        await newKyc.save(); 
        res.status(200).json({ success: true, recordId: newKyc._id });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Database operation failed.' });
    }
};

// 2. GET KYC STATUS (Naya wala)
exports.getKycStatus = async (req, res) => {
    try {
        const userId = req.query.userId; 
        
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required in query params.' });
        }

        const record = await KycRecord.findOne({ userId });
        if (!record) {
            return res.status(404).json({ success: false, message: 'KYC record not found for this user.' });
        }

        res.status(200).json({ success: true, kycStatus: record.kycStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching KYC status.' });
    }
};

// 3. GET KYC DETAILS (Naya wala)
exports.getKycDetails = async (req, res) => {
    try {
        const { kycId } = req.params; 
        
        const record = await KycRecord.findById(kycId);
        if (!record) {
            return res.status(404).json({ success: false, message: 'KYC record not found.' });
        }

        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error fetching KYC details.' });
    }
};
