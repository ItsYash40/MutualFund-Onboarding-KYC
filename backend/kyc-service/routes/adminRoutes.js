const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

// ================= ADMIN ROUTES =================
// Har route se pehle authMiddleware check karega token, phir requireAdmin check karega role

// 1. Get all pending applications
router.get('/pending', authMiddleware, requireAdmin, adminController.getPendingKyc);

// 2. Approve KYC
router.post('/approve/:kycId', authMiddleware, requireAdmin, adminController.approveKyc);

// 3. Reject KYC
router.post('/reject/:kycId', authMiddleware, requireAdmin, adminController.rejectKyc);

// 4. Run Machine Learning OCR Scan
router.get('/:kycId/ocr', authMiddleware, requireAdmin, adminController.runOcrCheck);

module.exports = router;
