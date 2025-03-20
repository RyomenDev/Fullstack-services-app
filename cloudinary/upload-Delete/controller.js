const Product = require("../../../models/Shop/product");
const { uploadImage, deleteImage } = require("./uploadRoutes");
const folderName = process.env.CLOUDINARY_SHOP_FOLDER;

export const AddProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      // Other fields can be added here as needed
    } = req.query;
    let imageUrl = "";
    // Validate all required fields
    if (
      !name ||
      !price
      // Other fields can be added here as needed
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }
    // Validate price
    if (isNaN(price) || Number(price) <= 0) {
      return res
        .status(400)
        .json({ error: "Price must be a positive number." });
    }
    // Handle image upload
    if (req.file) {
      try {
        imageUrl = await uploadImage(req.file, folderName);
      } catch (err) {
        console.error("Image upload failed:", err.message);
        return res.status(500).json({ error: "Image upload failed." });
      }
    } else {
      return res.status(400).json({ error: "Product image is required." });
    }
    // Create and save new product
    const newProduct = new Product({
      name,
      description,
      price: Number(price), // Ensure price is a number
      subcategory,
      category,
      shortDescription,
      image: imageUrl,
    });
    console.log("newProduct", newProduct);

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Delete a specific product by ID
const DeleteProduct = async (req, res) => {
  try {
    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      // Product not found
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the associated image from Cloudinary if it exists
    if (deletedProduct.image) {
      await deleteImage(deletedProduct.image);
    }

    // Respond with success message
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    // Log and respond with error
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// Update a specific product by ID
const UpdateProduct = async (req, res) => {
  console.log("updating-product");

  try {
    // Find the existing product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Destructure fields from request
    const {
      name,
      price,
      // Other fields can be added here as needed
    } = req.query;

    // Prepare fields to be updated
    let updatedFields = {
      name,
      price,
      // Other fields can be added here as needed
    };

    // Handle image update if a new file is provided
    if (req.file) {
      // Upload the new image and get URL
      const newImageUrl = await uploadImage(req.file, folderName);

      // Delete the old image from Cloudinary if it exists
      if (product.image) {
        await deleteImage(product.image, folderName);
      }

      // Add new image URL to updated fields
      updatedFields.image = newImageUrl;
    }

    // Update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Respond with the updated product
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};

// module.exports = AddProduct;
