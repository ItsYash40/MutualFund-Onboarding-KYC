const mongoose = require('mongoose');

const kycDraftSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  currentStep: {
    type: String,
    enum: ['PROFILE_INFO', 'DOCUMENT_UPLOAD', 'BANK_DETAILS'],
    default: 'PROFILE_INFO'
  },
  draftData: {
    panNumber: { type: String, default: '' },
    dob: { type: String, default: '' },
    address: { type: String, default: '' },
    panDocumentS3Key: { type: String, default: '' },
    addressDocumentS3Key: { type: String, default: '' }
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now,
    expires: 604800 
  }
});

kycDraftSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('kycDraft', kycDraftSchema);