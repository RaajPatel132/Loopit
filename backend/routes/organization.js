const express = require("express");
const router = express.Router();
const { createOrganization } = require("../controllers/orgController");

const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(",") || [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Only image files are allowed! Allowed types: ${allowedTypes.join(
          ", "
        )}`
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // Default 5MB
  },
  fileFilter: fileFilter,
});

const { authenticate } = require("../middleware/auth");
const { validateCreateOrg } = require("../middleware/orgValidation");

router.post(
  "/create",
  (req, res, next) => {
    upload.multer("logo")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          const maxSizeMB = Math.round(
            (parseInt(process.env.MAX_FILE_SIZE) || 5242880) / 1024 / 1024
          );
          return res.status(400).json({
            success: false,
            message: `File too large. Maximum size allowed is ${maxSizeMB}MB.`,
          });
        }
        return res.status(400).json({
          success: false,
          message: `Upload error: ${err.message}`,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      next();
    });
  },
  authenticate,
  validateCreateOrg,
  createOrganization
);

module.exports = router;
