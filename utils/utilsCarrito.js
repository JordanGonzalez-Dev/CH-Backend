const fs = require("fs");
const DB = require("../models/carrito.json");

const saveToDatabase = (database) => {
    fs.writeFileSync("../models/carrito.json", JSON.stringify(database, null, 2), {
        encoding: "utf-8",
    });
};

// Funciones: /api/carrito
const getAll = () => {
    return DB.carrito;
};

const getById = (id) => {
    const cart = DB.carrito.find((cart) => cart.id === +id);

    if (!cart) {
        return;
    };

    return cart;
};

const createCart = (newCart) => {
    DB.carrito.push(newCart);

    saveToDatabase(DB);

    return newCart;
};

const deleteCart = (id) => {
    const indexCart = DB.carrito.findIndex((cart) => cart.id === +id);

    if (indexCart < 0) {
        return `El número de id: '${id}' NO existe`;
    };

    const newList = DB.carrito.filter((list) => list.id !== +id);

    DB.carrito = newList;

    saveToDatabase(DB);

    return newList;
};

const createProduct = (id, newProduct) => {
    const indexProduct = DB.carrito.findIndex((product) => product.id === +id);

    const cart = DB.carrito.find((product) => product.id === +id);

    //Validamos que el carrito con el ID exista
    if (indexProduct < 0) {
        return `Número de carrito: '${id}' NO existente!`;
    };

    const nombre = cart.productos.find(
        (product) => product.nombre === newProduct.nombre
    );

    //Validamos que el nombre ingresado no este asignado a otro producto.
    if (nombre) {
        return `Producto con el nombre: '${newProduct.nombre}' existente!`;
    };

    const newProductId = {
        id: cart.productos.length + 1,
        ...newProduct,
    };

    cart.productos.push(newProductId);

    DB.carrito[indexProduct] = cart;

    saveToDatabase(DB);

    return newProductId;
};

const deleteProduct = (id, id_prod) => {
    const indexCart = DB.carrito.findIndex((cart) => cart.id === +id);

    const indexProduct = DB.carrito[indexCart].productos.findIndex(
        (el) => el.id === +id_prod
    );

    if (indexCart < 0) return `Número de Carrito: '${id}' NO existe!`;

    if (indexProduct < 0) return `Número de Producto: '${id_prod}' NO existe! `;

    const newListProduct = DB.carrito[indexCart].productos.filter(
        (product) => product.id !== indexProduct + 1
    );

    DB.carrito[indexCart].productos = newListProduct;

    DB.carrito[indexCart].productos.map((el) => (el.id = 1));

    saveToDatabase(DB);

    return newListProduct;
};

module.exports = {
    getAll,
    getById,
    createCart,
    deleteCart,
    createProduct,
    deleteProduct,
};