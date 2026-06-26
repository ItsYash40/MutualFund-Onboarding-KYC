import { authApi, kycApi, adminApi, documentApi } from './axios';

// ==========================================
// AUTH SERVICE (Port 4001)
// ==========================================
export const authService = {
  register: (data) => authApi.post('/register', data),
  login: (data) => authApi.post('/login', data),
  logout: () => authApi.post('/logout'),
  getMe: () => authApi.get('/me'),
  changePassword: (data) => authApi.put('/change-password', data),
  forgetPassword: (data) => authApi.post('/forget-password', data),
  verifyResetOtp: (data) => authApi.post('/verify-reset-otp', data),
  resetPassword: (data) => authApi.post('/reset-password', data),
};

// ==========================================
// KYC SERVICE (Port 4002)
// ==========================================
export const kycService = {
  createDraft: (data) => kycApi.post('/draft', data),
  uploadPan: (formData) => kycApi.post('/pan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  validatePan: (data) => kycApi.post('/pan/validate', data),
  sendAadhaarOtp: (data) => kycApi.post('/aadhar/send-otp', data),
  verifyAadhaarOtp: (data) => kycApi.post('/aadhar/verify-otp', data),
  submitKyc: () => kycApi.post('/submit'),
  getKycStatus: () => kycApi.get('/kyc-status'),
  getKycById: (kycId) => kycApi.get(`/${kycId}`),
  getKycOcr: (kycId) => kycApi.get(`/${kycId}/ocr`),
};

// ==========================================
// DOCUMENT SERVICE (Port 4003)
// ==========================================
export const documentService = {
  deleteDocument: (documentId) => documentApi.delete(`/${documentId}`),
  replaceDocument: (documentId, formData) => documentApi.put(`/${documentId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// ==========================================
// ADMIN SERVICE (Port 4004)
// ==========================================
export const adminService = {
  getDashboardStats: () => adminApi.get('/dashboard/stats'),
  getPendingKyc: () => adminApi.get('/kyc/pending'),
  getApprovedKyc: () => adminApi.get('/kyc/approved'),
  getRejectedKyc: () => adminApi.get('/kyc/rejected'),
  searchUser: (name) => adminApi.get(`/user/search?q=${name}`),
  getKycDetails: (kycId) => adminApi.get(`/kyc/${kycId}`),
  approveKyc: (kycId) => adminApi.post(`/kyc/${kycId}/approve`),
  rejectKyc: (kycId, data) => adminApi.post(`/kyc/${kycId}/reject`, data),
};
