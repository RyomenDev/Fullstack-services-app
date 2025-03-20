const multer = require("multer");
const { cloudinary } = require("../config/Cloudinary"); // Import the configured cloudinary instance
const fs = require("fs");
const path = require("path");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Directory to save files locally before upload
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage });

const uploadImage = async (file, folderName) => {
  try {
    // Log the folder being used
    // console.log("Uploading to Cloudinary in folder:", folderName);

    // Upload the image to Cloudinary with the dynamic folder name
    const result = await cloudinary.uploader.upload(file.path, {
      folder: folderName, // Use the folder name passed or fallback
      use_filename: true,
      unique_filename: true,
    });

    // Delete the local file after upload
    fs.unlinkSync(file.path);

    // Return the URL of the uploaded image
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Image upload failed");
  }
};

const deleteImage = async (imageUrl, folderName) => {
  try {
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("Invalid image URL provided.");
    }
    // console.log("imageUrl", imageUrl);

    // Extract the public ID from the image URL
    let publicId = imageUrl
      .substring(imageUrl.lastIndexOf("/") + 1)
      .replace(/\.[^/.]+$/, "");
    publicId = `${folderName}/` + publicId;
    // console.log("publicId", publicId);

    // Delete the image using the public ID
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Failed to delete image from Cloudinary");
    }

    // console.log("Image deleted successfully from Cloudinary.");
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message);
    throw new Error("Image deletion failed");
  }
};

module.exports = upload; // Export multer upload middleware
module.exports.uploadImage = uploadImage; // Export uploadImage function
module.exports.deleteImage = deleteImage; // Export deleteImage function
