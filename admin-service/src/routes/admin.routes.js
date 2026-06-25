const router = require("express").Router();


const adminController =
require("../controllers/admin.controller");

router.get("/dashboard/stats",
adminController.getDashboardStats);

router.get("/kyc/pending",
adminController.getPendingKyc);

router.get("/kyc/approved",
adminController.getApprovedKyc);

router.get("/kyc/rejected",
adminController.getRejectedKyc);

router.get("/kyc/:kycId",
adminController.getKycDetails);

router.post("/kyc/:kycId/approve",
adminController.approveKyc);

router.post("/kyc/:kycId/reject",
adminController.rejectKyc);

router.get("/users/search",
adminController.searchUsers);



module.exports = router;