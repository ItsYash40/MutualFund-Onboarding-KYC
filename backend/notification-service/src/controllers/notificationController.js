import * as notificationService from "../services/notificationService.js";

/**
 * Fetch all notifications for the authenticated user
 */
export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required in token payload",
      });
    }

    const notifications = await notificationService.getUserNotifications(userId);

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get count of unread notifications for the authenticated user
 */
export const getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required in token payload",
      });
    }

    const unreadCount = await notificationService.getUnreadCount(userId);

    return res.status(200).json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark a single notification as read
 */
export const markAsRead = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.userId;

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "Notification ID is required",
      });
    }

    const notification = await notificationService.markAsRead(notificationId, userId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read successfully",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark all user notifications as read
 */
export const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    await notificationService.markAllAsRead(userId);

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a notification (Internal service communication)
 */
export const createInternalNotification = async (req, res, next) => {
  try {
    const { userId, title, message, type, referenceId, referenceType } = req.body;

    if (!userId || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "userId, title, and message are required fields",
      });
    }

    const notification = await notificationService.createNotification({
      userId,
      title,
      message,
      type,
      referenceId,
      referenceType,
    });

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};
