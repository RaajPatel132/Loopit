const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");

const { authenticate } = require("../middleware/auth");
const { validateCreateProj } = require("../middleware/projValidation");

router.post("/create", authenticate, validateCreateProj, createProject);

module.exports = router;
