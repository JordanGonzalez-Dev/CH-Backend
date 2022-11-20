const utilsCarrito = require("../models/utilsCarrito");
const utilsProductos = require("../models/utilsProductos");

const getAllCart = (req, res) => {
    const allCart = utilsCarrito.getAll();

    res.status(200).json({
        status: "OK",
        data: allCart
    });
};

const getById = (req, res) => {
    const { id } = req.params;

    const cart = utilsCarrito.getById(id);

    if (!cart) {
        res
            .status(204)
            .json({
                status: "False",
                result: `ID: '${id}' NO encontrado! `
            });
    }
    res.status(200).json({
        status: "OK",
        data: cart
    });
};

const createCart = (req, res) => {
    const { productos } = req.body;

    if (!productos) {
        res.status(401).json({
            status: "False",
            result: "Producto no cumple con el formato requerido!",
        });
    }

    productos.forEach(e => {
        e.id = utilsProductos.getAll().length + 1
    });

    const newCart = {
        id: utilsCarrito.getAll().length + 1,
        timestamp: new Date().toUTCString(),
        productos,
    };

    const createNewCart = utilsCarrito.createCart(newCart);
    if (!createNewCart) {
        res.status(401).json({
            status: "False",
            result: "Producto no cumple con el formato requerido!",
        });
    };

    res.status(201).json({
        status: "Created",
        data: newCart
    });

    return createNewCart;
};

const deleteOneCart = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return;
    }

    const newList = utilsCarrito.deleteCart(id);

    res.status(202).json({
        status: "OK",
        data: newList
    });
};

const createOneProduct = (req, res) => {
    const { id } = req.params;

    const {
        nombre,
        descripcion,
        foto,
        precio,
        stock
    } = req.body;

    if (!nombre || !descripcion || !foto || !precio || (!stock && !id)) {
        res
            .status(204)
            .json({
                status: "False",
                result: "Formato ingresado incompleto."
            });

        return;
    }

    const newProduct = {
        timestamp: new Date().toUTCString(),
        nombre,
        descripcion,
        codigo: Math.floor(Math.random() * 100),
        foto,
        precio,
        stock,
    };

    const product = utilsCarrito.createProduct(id, newProduct);

    res.status(201).json({
        status: "OK",
        data: product
    });
};

const deleteProduct = (req, res) => {
    const {
        id,
        id_prod
    } = req.params;

    if (!id || !id_prod) {
        return;
    }

    const deleteOneProduct = utilsCarrito.deleteProduct(id, id_prod);
    
    res.status(202).json({
        status: "Delete",
        data: deleteOneProduct
    });
};

module.exports = {
    getAllCart,
    getById,
    createCart,
    deleteOneCart,
    createOneProduct,
    deleteProduct,
};