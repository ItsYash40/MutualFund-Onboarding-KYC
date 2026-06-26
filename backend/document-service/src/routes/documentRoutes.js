import express from "express";
import upload from "../middlewares/uploadMiddleware.js";

import {
  uploadDocument,
  getDocumentsByKycId,
  viewDocument,
  deleteDocument,
  replaceDocument,
} from "../controllers/documentController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * Upload PAN Card
 */
router.post(
  "/upload/pan-card",
  authMiddleware,
  upload.single("file"),
  (req, res, next) => {
    req.body.documentType = "PAN_CARD";
    next();
  },
  uploadDocument
);

/**
 * Upload Aadhaar Front
 */
router.post(
  "/upload/aadhaar-front",
  authMiddleware,
  upload.single("file"),
  (req, res, next) => {
    req.body.documentType = "AADHAAR_FRONT";
    next();
  },
  uploadDocument
);

/**
 * Upload Aadhaar Back
 */
router.post(
  "/upload/aadhaar-back",
  authMiddleware,
  upload.single("file"),
  (req, res, next) => {
    req.body.documentType = "AADHAAR_BACK";
    next();
  },
  uploadDocument
);

/**
 * Upload Signature
 */
router.post(
  "/upload/signature",
  authMiddleware,
  upload.single("file"),
  (req, res, next) => {
    req.body.documentType = "SIGNATURE";
    next();
  },
  uploadDocument
);

/**
 * Upload Photo
 */
router.post(
  "/upload/photo",
  authMiddleware,
  upload.single("file"),
  (req, res, next) => {
    req.body.documentType = "PHOTO";
    next();
  },
  uploadDocument
);

/**
 * Generic Upload
 */
router.post("/upload", authMiddleware, upload.single("file"), uploadDocument);

/**
 * Get docs by KYC Id
 */
router.get("/kyc/:kycId", authMiddleware, getDocumentsByKycId);

/**
 * View document
 */
router.get("/view/:documentId", authMiddleware, viewDocument);

/**
 * Delete document
 */
router.delete("/:documentId", authMiddleware, deleteDocument);

/**
 * Replace document
 */
router.put(
  "/:documentId",
  authMiddleware,
  upload.single("file"),
  replaceDocument
);

export default router;
