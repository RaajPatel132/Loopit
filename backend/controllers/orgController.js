// fix: converted to ES module syntax and exported createOrganization

const Organization = require("../models/Organization.js");
const { cleanupUploadedFile } = require("../utils/fileUtils.js");

const createOrganization = async (req, res) => {
  try {
    const userId = req.user && req.user.id ? req.user.id : null;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    let logoUrl = null;

    // Handle file upload if present
    if (req.file) {
      logoUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const { name, description } = req.body;

    // Validate required fields
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Organization name is required",
      });
    }

    const org = await Organization.create({
      name: name.trim(),
      description: description ? description.trim() : null,
      logoUrl,
      isActive: true,
      createdBy: userId,
    });

    res.status(201).json({
      success: true,
      message: "Organisation created successfully",
      data: {
        org,
      },
    });
  } catch (error) {
    console.error("Error creating organization:", error);

    // Clean up uploaded file if organization creation failed
    if (req.file) {
      await cleanupUploadedFile(req.file);
    }

    // Handle specific database validation errors
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        })),
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during organization creation",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  createOrganization,
};
