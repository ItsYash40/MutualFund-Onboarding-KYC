const KycRecord = require('../models/kycModel');

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