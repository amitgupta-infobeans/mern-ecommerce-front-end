import { ProductModel } from "../Models/Product.js";

// ADD PRODUCT.
export const addProduct = async (req, res) => {
  try {
    const { name, price, qty, category, desc, picture } = req.body;
    const product = await ProductModel.create({ name, qty, price, category });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (e) {
    res.status(400).json({ success: true, message: e.message });
  }
};

// EDIT PRODUCT.
export const editProduct = async (req, res) => {
  try {
    const { name, price, qty, category, desc, picture } = req.body;
    const {id} = req.params;
    let getProduct = await ProductModel.findById(id);
    if (!getProduct) {
      return res
        .status(404)
        .json({ success: false, message: "No product found for given id" });
    }
    let updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      { name, price, qty, desc, picture, category },
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Something went wrong to update the product",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated.",
      data: updateProduct,
    });
  } catch (e) {
    res.status(404).json({ success: false, message: e.message });
  }
};

// GET ALL PRODUCTS.
export const getAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found." });
    }
    res
      .status(200)
      .json({ success: true, message: "all products fetched", data: products });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let getProduct = await ProductModel.findById(id);
    if (!getProduct) {
      return res
        .status(404)
        .json({ success: false, message: "No product found for the give id." });
    }
    res.status(200).json({
      success: true,
      message: "one product data fetched successfully",
      data: getProduct,
    });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

// DELETE PRODUCT.
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let isDeleted = await ProductModel.findByIdAndDelete(id);
    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: "invalid product id provided.",
      });
    }
    res.status(200).json({ success: true, message: "Product deleted." });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
