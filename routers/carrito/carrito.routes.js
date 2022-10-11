const express = require('express');

const router = express.Router();

const {
    getAllCart,
    getById,
    createCart,
    deleteOneCart,
    createOneProduct,
    deleteProduct,
} = require("../../controllers/controllerCarrito");

// Endpoints Carrito
router.post("/", createCart);
router.delete("/:id", deleteOneCart);
router.get("/", getAllCart);
router.get("/:id/productos", getById);
router.post("/:id/productos", createOneProduct);
router.delete("/:id/productos/:id_prod", deleteProduct);

module.exports = router;