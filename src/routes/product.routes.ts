import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", (req, res) => {
  productController.getProductById(req, res);
});
productRouter.get("/search", productController.getProductByName);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", (req, res) => {
  productController.updateProduct(req, res);
});
productRouter.delete("/:id", (req, res) => {
  productController.deleteProduct(req, res);
});

export default productRouter;
