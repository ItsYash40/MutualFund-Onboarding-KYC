import Document from "../models/Document.js";

export const createDocument = async (documentData) => {
  return Document.create(documentData);
};

export const findDocumentById = async (documentId) => {
  return Document.findById(documentId);
};

export const findDocumentsByKycId = async (kycId) => {
  return Document.find({ kycId });
};

export const findExistingDocument = async (
  kycId,
  documentType
) => {
  return Document.findOne({
    kycId,
    documentType,
  });
};

export const deleteDocumentById = async (
  documentId
) => {
  return Document.findByIdAndDelete(documentId);
};

export const updateDocument = async (
  document
) => {
  return document.save();
};