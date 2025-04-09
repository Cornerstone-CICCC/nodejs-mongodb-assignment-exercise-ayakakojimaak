import express, { Request, Response } from "express";
import { Product, IProduct } from "../models/product.model";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  try {
    const { productName, productPrice } = req.body;
    const newProduct = await Product.create({ productName, productPrice });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

const updateProduct = async (req: Request<{ id: string }, {}, IProduct>, res: Response) => {
  try {
    const { productName, productPrice } = req.body;
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, productPrice },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

const getProductByName = async (req: Request<{}, {}, { productName: string }>, res: Response) => {
  try {
    const { query } = req.query;
    const products: IProduct[] = await Product.find({
      productName: {
        $regex: query,
        $options: "i",
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
};

const deleteProduct = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductByName,
  deleteProduct,
};
