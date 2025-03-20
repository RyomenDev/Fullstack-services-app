import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { description, name, price, stock, color, size, category } = req.body;

  // Validate required fields
  if ([description, name, price, stock].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "All fields are required");
  }

  const productImageLocalPath = req.files?.productImage[0]?.path;

  if (!productImageLocalPath) {
    throw new ApiError(401, "ProductImage file is required");
  }

  const productImage = await uploadOnCloudinary(productImageLocalPath);

  if (!productImage) {
    throw new ApiError(401, "productImage file is required");
  }

  // Create the product object
  const newProduct = await Product.create({
    name,
    description,
    productImage: productImage.url,
    price,
    stock,
    category,
    owner: req.user._id,
    color: color || [],
    size: size || [],
  });

  const createdProduct = await Product.findById(newProduct._id);

  return res
    .status(201)
    .json(new ApiResponse(200, createdProduct, "Product add successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById({ _id: userId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isAdmin) {
    throw new ApiError(403, "Unauthorized access");
  }

  const { productId } = req.params;
  const existProduct = await Product.findById({ _id: productId });
  const { description, name, price, stock, color, size } = req.body;

  // Check if any required fields are missing
  if (!existProduct) {
    throw new ApiError(401, "Product Id is not found");
  }

  // Initialize an empty object to store the update fields
  const updateFields = {};

  // Check and update each field if provided
  if (description !== undefined) updateFields.description = description;
  if (name !== undefined) updateFields.name = name;
  if (price !== undefined) updateFields.price = price;
  if (stock !== undefined) updateFields.stock = stock;
  if (color !== undefined) updateFields.color = color;
  if (size !== undefined) updateFields.size = size;

  let productImage;
  if (
    req.files &&
    Array.isArray(req.files.productImage) &&
    req.files.productImage.length > 0
  ) {
    const productImageLocalPath = req.files.productImage[0].path;
    const uploadedProductImage = await uploadOnCloudinary(
      productImageLocalPath
    );
    if (!uploadedProductImage) {
      throw new ApiError(400, "Error while uploading productImage");
    }
    productImage = uploadedProductImage.url;
    updateFields.productImage = productImage; // Include productImage if it's provided
  }

  // Check if any fields are provided for update
  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(401, "No fields provided for update");
  }

  // Update the product details
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { $set: updateFields },
    { new: true } // Return the updated document
  );

  // If no product is found, return a 404 error
  if (!updatedProduct) {
    throw new ApiError(401, "Product not found");
  }

  // Return the updated product as a response
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product details updated successfully"
      )
    );
});
