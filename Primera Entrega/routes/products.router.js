import ProductManager from "../controllers/ProductManager.js";
import { Router } from "express";
import path from "path";

const filePath = path.resolve("./db") + "/Products.json";
const pm = new ProductManager(filePath);

const routerProducts = Router();

routerProducts.get("/", async (req, res) => {
  try {
    const products = await pm.getProducts();
    const limit = +req.query.limit || products.length;
    const productList = products.slice(0, limit);
    return res.status(200).json({ status: "success", data: productList });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        error: "No se pueden obtener los productos, error en el servidor",
      });
  }
});

routerProducts.get("/:pid", async (req, res) => {
  const productId = +req.params.pid;
  if (isNaN(productId)) {
    res
      .status(400)
      .json({
        status: "error",
        error: "El parámetro id debe ser un número válido",
      });
    return;
  }
  try {
    const product = await pm.getProductById(productId);
    if (product.error) {
      res.status(400).json({ status: "error", error: product.message });
      return;
    }
    res.status(200).json({ status: "sucess", data: product.data });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

routerProducts.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const result = await pm.addProduct(newProduct);
    if (result.error) {
      res.status(400).json({ status: "error", error: result.message });
      return;
    }
    res.status(201).json({ status: "sucess", data: result.data });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

routerProducts.put("/:pid", async (req, res) => {
  const productId = +req.params.pid;
  const productUpdated = req.body;
  if (isNaN(productId)) {
    res
      .status(400)
      .json({
        status: "error",
        error: "El parámetro id debe ser un número válido",
      });
    return;
  }
  try {
    const result = await pm.update(productId, productUpdated);
    if (result.error) {
      res.status(400).json({ status: "error", error: result.message });
      return;
    }
    res.status(201).json({ status: "sucess", data: result.data });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

routerProducts.delete("/:pid", async (req, res) => {
  const productId = +req.params.pid;
  if (isNaN(productId)) {
    res
      .status(400)
      .json({
        status: "error",
        error: "El parámetro id debe ser un número válido",
      });
    return;
  }
  try {
    const result = await pm.delete(productId);
    if (result.error) {
      res.status(400).json({ status: "error", error: result.message });
      return;
    }
    res.status(200).json({ status: "sucess", data: result.data });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default routerProducts;
