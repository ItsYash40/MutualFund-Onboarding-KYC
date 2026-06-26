import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),

  body("email").isEmail().withMessage("Invalid email"),

  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile must be 10 digits"),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character"
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];
