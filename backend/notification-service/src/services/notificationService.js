import Notification from "../models/Notification.js";

/**
 * Create a new notification
 */
export const createNotification = async ({
  userId,
  title,
  message,
  type = "INFO",
  referenceId = null,
  referenceType = "SYSTEM",
}) => {
  return await Notification.create({
    userId,
    title,
    message,
    type,
    referenceId,
    referenceType,
  });
};

/**
 * Get all notifications for a user, sorted by most recent
 */
export const getUserNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

/**
 * Get count of unread notifications for a user
 */
export const getUnreadCount = async (userId) => {
  return await Notification.countDocuments({ userId, isRead: false });
};

/**
 * Mark a specific notification as read if it belongs to the user
 */
export const markAsRead = async (notificationId, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
};

/**
 * Mark all notifications for a user as read
 */
export const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );
};
