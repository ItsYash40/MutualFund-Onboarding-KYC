const KycRecord = require('../models/kycModel');
const Tesseract = require('tesseract.js'); // npm install tesseract.js

// 1. Saare Pending KYC list nikalna (COMPLETED status wale jo user submit kar chuka hai)
exports.getPendingKyc = async (req, res) => {
    try {
        const records = await KycRecord.find({ kycStatus: 'COMPLETED' });
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch pending KYCs.' });
    }
};

// 2. KYC Approve karna
exports.approveKyc = async (req, res) => {
    try {
        const { kycId } = req.params;
        const record = await KycRecord.findByIdAndUpdate(
            kycId, 
            { kycStatus: 'APPROVED', adminRemarks: 'Verified Successfully' }, 
            { new: true }
        );
        
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.status(200).json({ success: true, message: 'KYC Approved!', data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// 3. KYC Reject karna with reason
exports.rejectKyc = async (req, res) => {
    try {
        const { kycId } = req.params;
        const { reason } = req.body; // Admin frontend se reason bhejega

        if (!reason) return res.status(400).json({ success: false, message: 'Rejection reason is required.' });

        const record = await KycRecord.findByIdAndUpdate(
            kycId, 
            { kycStatus: 'REJECTED', adminRemarks: reason }, 
            { new: true }
        );
        
        if (!record) return res.status(404).json({ success: false, message: 'Record not found' });
        res.status(200).json({ success: true, message: 'KYC Rejected!', data: record });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// 4. THE BOSS LEVEL: OCR SCANNER (Tesseract.js Integration)
exports.runOcrCheck = async (req, res) => {
    try {
        const { kycId } = req.params;
        
        // Asli project mein yahan tum MongoDB se image path uthaoge (record.panImageUrl)
        // Dummy testing ke liye hum ek dummy URL use kar rahe hain
        const dummyImageUrl = 'https://tesseract.projectnaptha.com/img/eng_bw.png'; 

        // OCR Processing (Machine Learning at work 🔥)
        Tesseract.recognize(
            dummyImageUrl,
            'eng',
            { logger: m => console.log(m) } // Terminal mein progress dikhayega
        ).then(({ data: { text } }) => {
            
            // Yahan check hoga ki OCR ne user ka naam scan kiya ya nahi
            const isNameMatched = text.toLowerCase().includes('yash'); // example

            res.status(200).json({
                success: true,
                message: "OCR Scan Completed",
                ocrText: text,
                isNameMatched: isNameMatched
            });
        }).catch(err => {
            res.status(500).json({ success: false, message: 'OCR Engine Failed' });
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error during OCR' });
    }
};
