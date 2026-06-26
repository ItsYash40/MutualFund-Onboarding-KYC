import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    kycId: {
      type: String,
      required: true,
      index: true,
    },

    documentType: {
      type: String,
      required: true,
      enum: ["PAN_CARD", "AADHAAR_FRONT", "AADHAAR_BACK", "SIGNATURE", "PHOTO"],
    },

    originalName: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes MUST come after schema creation
documentSchema.index({
  kycId: 1,
  documentType: 1,
});

documentSchema.index({
  userId: 1,
});

export default mongoose.model("Document", documentSchema);
