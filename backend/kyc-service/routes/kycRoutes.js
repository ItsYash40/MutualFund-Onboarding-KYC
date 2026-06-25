const express = require('express');
const router = express.Router();
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const draftController = require('../controllers/draftController');
const panController = require('../controllers/panController');
const aadharController = require('../controllers/aadharController'); 
const submitController = require('../controllers/submitController');
const { authMiddleware } = require('../middleware/authMiddleware'); 

const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 3, 
    message: { success: false, message: 'Too many requests. Try again after 5 mins.' }
});

const checkValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
};

const storage = multer.memoryStorage();
const upload = multer({ 
    limits: { fileSize: 5 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Invalid file type.'), false);
    }
});

// ================= ROUTES =================

router.post('/draft', authMiddleware, draftController.saveDraft);
router.post('/pan', upload.single('panCard'), panController.extractPanData);
router.post('/aadhar/send-otp', otpLimiter, aadharController.sendOtp);
router.post('/aadhar/verify-otp', aadharController.verifyOtp);

router.post('/submit', [
    body('userId').notEmpty().withMessage('User ID required.'),
    body('panNumber').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage('Invalid PAN format.'),
    body('aadharData.name').notEmpty().withMessage('Name required.'),
    checkValidationErrors 
], submitController.finalSubmit);

module.exports = router;