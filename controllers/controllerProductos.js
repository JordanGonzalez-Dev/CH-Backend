const utilsProductos = require("../models/utilsProductos");

const getAllProducts = (req, res) => {
    const allProducts = utilsProductos.getAll();

    res.status(200).json({
        status: "OK",
        data: allProducts
    });
};

const getById = (req, res) => {
    const { id } = req.params;

    const product = utilsProductos.getById(id);

    if (!product) {
        return;
    }

    res.json({
        status: "OK",
        data: product
    });
};

const createProduct = (req, res) => {
    const {
        nombre,
        descripcion,
        foto,
        precio,
        stock
    } = req.body;

    if (!nombre || !descripcion || !foto || !precio || !stock) {
        res.status(404).json({
            status: "False",
            result: "Producto no cumple con el formato requerido!",
        });

        return;
    }

    const newProduct = {
        id: utilsProductos.getAll().length + 1,
        timestamp: new Date().toUTCString(),
        nombre,
        descripcion,
        codigo: Math.floor(Math.random() * 100),
        foto,
        precio,
        stock,
    };

    const createNewProduct = utilsProductos.createProduct(newProduct);

    if (!createNewProduct) {
        res.status(404).json({
            status: "False",
            result: `Producto con el nombre '${nombre}' creado.`,
        });

        return;
    };

    res.status(201).json({
        status: "OK",
        data: createNewProduct
    });
};

const updateProduct = (req, res) => {
    const { id } = req.params;

    const {
        body
    } = req;

    if (!id) {
        return;
    }

    const updateOneProduct = utilsProductos.updateProduct(id, body);

    res.json({
        status: "OK",
        result: updateOneProduct
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;

    const deleteOneProduct = utilsProductos.deleteOneProduct(id);

    res.json({
        status: "OK",
        result: deleteOneProduct
    });
};

module.exports = {
    getAllProducts,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
};