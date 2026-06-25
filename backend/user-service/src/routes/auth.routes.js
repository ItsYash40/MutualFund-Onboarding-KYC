import express from "express";

// controller import
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  changePassword,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

// file import
import authMiddleware from "../middlewares/auth.middleware.js";
import { registerValidation } from "../middlewares/register.validations.js";
import { loginValidation } from "../middlewares/login.validation.js";
import { passwordValidation } from "../middlewares/password.validation.js";

const router = express.Router();

/**
 * @route POST /register
 * @access Public
 */
router.post("/register", authLimiter, registerValidation, register);

/**
 * @route POST /login
 * @access Public
 */
router.post("/login", authLimiter, loginValidation, login);

/**
 * Generate a new access token using a valid refresh token.
 * @route POST /refresh-token
 * @access Public
 */
router.post("/refresh-token", refreshAccessToken);

/**
 * @route POST /logout
 * @access Public
 */
router.post("/logout", authMiddleware, logout);

/**
 * @route POST /forgot-password
 * @access Public
 */
router.post("/forgot-password", authLimiter, forgotPassword);

/**
 * Verify the OTP sent for password reset.
 * @route POST /verify-reset-otp
 * @access Public
 */
router.post("/verify-reset-otp", verifyResetOtp);

/**
 * Reset user password after successful OTP verification.
 * @route POST /reset-password
 * @access Public
 */
router.post("/reset-password", passwordValidation, resetPassword);

/**
 * Get the authenticated user's profile details.
 * @route GET /me
 * @access Private
 */
router.get("/me", authMiddleware, getProfile);

/**
 * Change the authenticated user's password.
 * @route PUT /change-password
 * @access Private
 */
router.put(
  "/change-password",
  authMiddleware,
  passwordValidation,
  changePassword
);

export default router;
