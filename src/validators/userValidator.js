import { body } from "express-validator";
import { avaliableUserRole } from "../utils/constants.js";


const userRegisterValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3, max: 70 })
      .withMessage("Name must be 3-70 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid")
      .normalizeEmail(),

    body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

  ];
};


const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email")
      .normalizeEmail(),

    body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ];
};

const createUserValidator = () => {
  return [
    body("name")
      .trim()
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3, max: 70 })
      .withMessage("Name must be 3-70 characters"),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Email is invalid")
      .normalizeEmail(),
       body("password")
      .trim()
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    body("role")
      .optional()
      .isIn(avaliableUserRole)
      .withMessage(`Role must be one of: ${avaliableUserRole.join(", ")}`),
  ];
};


const updateUserValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .isLength({ min: 3, max: 70 })
      .withMessage("Name must be 3-70 characters"),

    body("role")
      .optional()
      .isIn(avaliableUserRole)
      .withMessage(`Role must be one of: ${avaliableUserRole.join(", ")}`),

    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be true or false"),
  ];
};


export {
  userRegisterValidator,
  userLoginValidator,
  updateUserValidator,
  createUserValidator
  
};