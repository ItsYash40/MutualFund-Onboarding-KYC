import fs from "fs";
import Document from "../models/Document.js";

/**
 * Generic Upload
 */
export const uploadDocument = async (req, res) => {
  try {
    const { kycId, documentType } = req.body;

    if (!kycId || !documentType) {
      return res.status(400).json({
        success: false,
        message: "kycId and documentType are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }
    const existingDocument = await Document.findOne({
      kycId,
      documentType,
    });

    if (existingDocument) {
      return res.status(409).json({
        success: false,
        message: "Document already exists. Use replace API.",
      });
    }

    if (existingDocument) {
      return res.status(409).json({
        success: false,
        message: `${documentType} already uploaded. Use replace API.`,
      });
    }

    const document = await Document.create({
      kycId,
      documentType,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: document,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Fetch all docs by KYC ID
 */
export const getDocumentsByKycId = async (req, res) => {
  try {
    const { kycId } = req.params;

    const documents = await Document.find({ kycId });

    return res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * View single document
 */
export const viewDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete document
 */
export const deleteDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    await document.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Replace existing document
 */
export const replaceDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Replacement file required",
      });
    }

    if (fs.existsSync(document.filePath)) {
      fs.unlinkSync(document.filePath);
    }

    document.originalName = req.file.originalname;
    document.fileName = req.file.filename;
    document.filePath = req.file.path;
    document.mimeType = req.file.mimetype;
    document.fileSize = req.file.size;

    await document.save();

    return res.status(200).json({
      success: true,
      message: "Document replaced successfully",
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
