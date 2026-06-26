const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const panController = require('../controllers/panController');

// Admin only route
router.get('/:kycId/ocr', adminAuth, panController.extractPanData);

module.exports = router;