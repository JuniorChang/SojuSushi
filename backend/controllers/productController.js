import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc   Get all products
// @route  GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const name = req.query.name
    ? {
        name: {
          $regex: req.query.name,
          $options: "i", //case insensitive
        },
      }
    : {};
  const count = await Product.count({ ...name });
  const products = await Product.find({ ...name })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  // console.log(` ${count} pages`);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc   Get single product
// @route  GET /api/products/:id
// @access  Public
const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Delete a  product
// @route  DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create a  product
// @route  POST /api/products/
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc   Update a  product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc   Create new review
// @route  POST /api/products/:id/reviews
// @access Private/
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("You have already reviewed this product");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce(
      (acc, item) => item.rating + acc,
      0 / product.reviews.length
    );

    await product.save();
    res.status(201).json({ message: "Review created" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProductbyId,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
