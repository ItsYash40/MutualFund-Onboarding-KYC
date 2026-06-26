import express from "express";
import * as notificationController from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// User notification routes (Authenticated)
router.get("/api/notifications", authMiddleware, notificationController.getNotifications);
router.get("/api/notifications/unread-count", authMiddleware, notificationController.getUnreadCount);
router.patch("/api/notifications/:notificationId/read", authMiddleware, notificationController.markAsRead);
router.patch("/api/notifications/read-all", authMiddleware, notificationController.markAllAsRead);

// Internal service communication route (Unauthenticated/Service-to-Service)
router.post("/internal/notifications", notificationController.createInternalNotification);

export default router;
