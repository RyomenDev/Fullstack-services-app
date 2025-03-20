const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL to the image stored in Cloudinary
      required: true,
    },
    category: {
      type: String, // Single category
      required: true,
      enum: [
        "option1",
        "option2",
        // other
      ],
    },
  },
  {
    timestamps: true, // This automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Product", productSchema);
