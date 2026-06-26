import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["INFO", "WARNING", "SUCCESS", "ERROR"],
      default: "INFO",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    // Reference fields to key service (kyc-service), userservice (user-service), and document-service
    referenceId: {
      type: String,
      default: null,
    },
    referenceType: {
      type: String,
      enum: ["USER", "KYC", "DOCUMENT", "SYSTEM"],
      default: "SYSTEM",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for query optimization when getting unread count or list of user notifications
notificationSchema.index({ userId: 1, isRead: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
