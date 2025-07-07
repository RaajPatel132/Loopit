const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/database");
const authRoutes = require("./routes/auth");
const orgRoutes = require("./routes/organization");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve static files from uploads directory
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/organizations", orgRoutes);

// Health check endpoint
app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📱 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
