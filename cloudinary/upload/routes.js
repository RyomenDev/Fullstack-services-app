import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

// Create a router instance
const router = express.Router();

// Define routes
router.route("/addProduct").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
  ]),
  verifyJWT,
  addProduct
);

router
  .route("/updateProduct/:productId")
  .patch(upload.single("productImage"), verifyJWT, updateProduct);

export default router;