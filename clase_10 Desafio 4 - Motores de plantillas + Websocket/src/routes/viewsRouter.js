import ProductManager from "../controllers/ProductManager.js";
import { Router } from "express";
import path from "path";

const viewsRouter = Router();
const pathFile = path.resolve("./src/db/Products.json");
const pm = new ProductManager(pathFile);

viewsRouter.get("/", async (req, res) => {
  try {
    const result = await pm.getProducts();
    res.status(201).render("home", { data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const result = await pm.getProducts();
    res.status(201).render("realTimeProducts", { data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default viewsRouter;
