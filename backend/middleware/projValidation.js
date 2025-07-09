const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const validateCreateProj = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Project Name must be between 2 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),

  body("slug")
    .trim()
    .isLength({ min: 3, max: 24 })
    .withMessage("Slug must be between 3 and 24 characters")
    .matches(/^(?![0-9-])[a-z0-9-]+$/)
    .withMessage(
      "Slug must be in abc-cd format, only lowercase letters, numbers, and '-' allowed, and cannot start with a number or '-'"
    ),
  handleValidationErrors,
];

module.exports = {
  validateCreateProj,
};
