import DOCUMENT_TYPES from "../constants/documentTypes.js";

export const validateDocumentType = (
  documentType
) => {
  return Object.values(
    DOCUMENT_TYPES
  ).includes(documentType);
};