import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";

// @desc   Get all products
// @route  GET /api/products
// @accesss  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// router.get("/:id", (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);
//   res.json(product);
// });

// @desc   Get single product
// @route  GET /api/products/:id
// @accesss  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
