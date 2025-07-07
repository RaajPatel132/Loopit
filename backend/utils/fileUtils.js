const fs = require("fs");
const path = require("path");

/**
 * Delete a file safely
 * @param {string} filePath - Path to the file to delete
 */
const deleteFile = async (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`File deleted: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
};

/**
 * Clean up uploaded file if operation fails
 * @param {object} file - Multer file object
 */
const cleanupUploadedFile = async (file) => {
  if (file && file.path) {
    await deleteFile(file.path);
  }
};

module.exports = {
  deleteFile,
  cleanupUploadedFile,
};
