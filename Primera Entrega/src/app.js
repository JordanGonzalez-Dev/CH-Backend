import Express from "express";
import cartRouter from "../routes/cart.router.js";
import routerProducts from "../routes/products.router.js";

const app = Express();
const port = 8080;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api/products/", routerProducts);
app.use("/api/carts/", cartRouter);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
