import ProductManager from "./ProductManager.js";
import express from "express";

const port = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));

const pathFile = "./data/productos.json";
const pm = new ProductManager(pathFile);

app.get("/products", async (req, res) => {
  try {
    const products = await pm.getProducts();
    const limit = Number(req.query.limit) || products.length;
    const productList = products.slice(0, limit);
    return res.status(200).send(productList);
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  const productId = Number(req.params.pid);
  if (typeof productId !== "number" || isNaN(productId)) {
    res.status(400).send({
      status: "error",
      error: "El parámetro id debe ser un número válido",
    });
    return;
  }
  try {
    const product = await pm.getProductById(productId);
    res.send(product);
  } catch (error) {
    console.log(error.message);
    res.send({ status: "error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Aplicación corriendo en el puerto ${port}`);
});
