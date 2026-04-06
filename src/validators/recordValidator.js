import {body} from "express-validator";
import { avaliableAmountType } from "../utils/constants.js";

const createRecordValidator = () => {
    return [
        body('amount')
        .notEmpty()
        .withMessage('Amount is required')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be a positive number'),

        body('type')
        .isIn(avaliableAmountType)
        .withMessage('Type must be income or expense'),

        body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),

        body('date')
        .isISO8601()
        .withMessage('Valid date is required (YYYY-MM-DD)'),

        body('notes')
        .optional()
        .isString(),
    ]
}

const updateRecordValidator = () => {
    return [
  body("amount")
    .optional()
    .isFloat({ gt: 0 }).withMessage("Amount must be a positive number"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .optional()
    .trim()
    .notEmpty().withMessage("Category cannot be empty"),

  body("date")
    .optional()
    .isISO8601().withMessage("Valid date is required (YYYY-MM-DD)"),

  body("notes")
    .optional()
    .trim()
    .isString().withMessage("Notes must be a string"),
];
}
export { createRecordValidator,
         updateRecordValidator     
        }