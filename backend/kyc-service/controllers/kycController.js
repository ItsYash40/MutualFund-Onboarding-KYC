const KycRecord = require('../models/kycModel');

exports.getKycStatus = async (req, res) => {
    try {
        const record = await KycRecord.findOne({ userId: req.params.userId });
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.status(200).json({ success: true, status: record.kycStatus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};