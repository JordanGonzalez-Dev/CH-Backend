import ProductManager from "./controllers/ProductManager.js";
import { Server } from "socket.io";
import ejs from "ejs";
import express from "express";
import path from "path";
import { template } from "./public/js/template.js";
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const port = 8083;

const httpServer = app.listen(port, () =>
  console.log(`Servidor escuchando en el puerto ${port}`)
);
const socketServer = new Server(httpServer);

const pm = new ProductManager(path.resolve("./src/db/Products.json"));
app.set("views", path.resolve("./src/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./src/public")));

app.use("/", viewsRouter);

socketServer.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado, id: ${socket.id}`);

  socket.on("disconnecting", () => {
    console.log(`cliente ${socket.id} desconectado`);
  });

  socket.on("delete", async (productID) => {
    try {
      if (isNaN(+productID)) {
        throw new Error("Debe ingresar un numero de id valido");
      }
      const result = await pm.delete(+productID);
      if (result.error) {
        socket.emit("error", { message: result.message });
      }
      const products = await pm.getProducts();
      const compiled = ejs.render(template, { data: products });
      socket.emit("productsDiv", compiled);
    } catch (error) {
      socket.emit("error", { message: "Se ha producido un error" });
    }
  });
  socket.on("addProduct", async (product) => {
    try {
      const result = await pm.addProduct(product);
      if (result.error) {
        socket.emit("error", result.message);
      }
      const products = await pm.getProducts();
      const compiled = ejs.render(template, { data: products });
      socket.emit("productsDiv", compiled);
    } catch (error) {
      socket.emit("error", error.message);
    }
  });
});
