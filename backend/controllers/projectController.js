const { create } = require("domain");
const Project = require("../models/Project.js");

const createProject = async (req, res) => {
  try {
    const { name, description, slug, organization } = req.body;
    const org = await Project.create({
      name: name.trim(),
      description: description ? description.trim() : null,
      slug: slug.trim(),
      isActive: true,
      organization: organization,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        org,
      },
    });
  } catch (error) {
    console.error("Error creating organization:", error);
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
  createProject,
};
