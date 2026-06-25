const adminService = require("../services/admin.services");


exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getPendingKyc = async (req, res) => {
  try {
    const data = await adminService.getPendingKyc();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Pending KYC Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getApprovedKyc = async (req, res) => {
  try {
    const data = await adminService.getApprovedKyc();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Approved KYC Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getRejectedKyc = async (req, res) => {
  try {
    const data = await adminService.getRejectedKyc();

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Rejected KYC Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getKycDetails = async (req, res) => {
  try {
    const { kycId } = req.params;

    const data =
      await adminService.getKycDetails(kycId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("KYC Details Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.approveKyc = async (req, res) => {
  try {
    const { kycId } = req.params;

    const response =
      await adminService.approveKyc(kycId);

    res.status(200).json({
      success: true,
      message: "KYC approved successfully",
      data: response,
    });
  } catch (error) {
    console.error("Approve Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.rejectKyc = async (req, res) => {
  try {
    const { kycId } = req.params;

    const { reason } = req.body;

    const response =
      await adminService.rejectKyc(
        kycId,
        reason
      );

    res.status(200).json({
      success: true,
      message: "KYC rejected successfully",
      data: response,
    });
  } catch (error) {
    console.error("Reject Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required",
      });
    }

    const users =
      await adminService.searchUsers(q);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Search Error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};