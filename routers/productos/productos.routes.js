const express = require('express');

const router = express.Router();

const {
    getAllProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../../controllers/controllerProductos");

// Endpoints Productos
router.get("/", getAllProducts);
router.get("/:id", getById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;