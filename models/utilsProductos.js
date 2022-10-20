const fs = require("fs");
const DB = require("./data.json");

const saveToDatabase = (database) => {
    fs.writeFileSync("./models/data.json", JSON.stringify(database, null, 2), {
        encoding: "utf-8",
    });
};

// Funciones: /api/productos
const getAll = () => {
    return DB.productos;
};

const getById = (id) => {
    const product = DB.productos.find((product) => product.id === +id);

    if (!product) {
        return `Producto con el id: '${id}' NO encontrado!`;
    };

    return product;
};

const createProduct = (newProduct) => {
    const findIndex =
        DB.productos.findIndex((product) => product.nombre === newProduct.nombre) > -1;

    if (findIndex) {
        return;
    }

    DB.productos.push(newProduct);

    saveToDatabase(DB);

    return newProduct;
};

const updateProduct = (id, changes) => {
    const index = DB.productos.findIndex((product) => product.id === +id);

    if (index == -1) {
        return `Producto con el id '${id}' NO encontrado`;
    };

    const newProduct = {
        ...DB.productos[index],
        ...changes,
        timestamp: new Date().toUTCString()
    };

    DB.productos[index] = newProduct;

    saveToDatabase(DB);

    return newProduct;
};

const deleteOneProduct = (id) => {
    const indexDelete = DB.productos.findIndex((product) => product.id === +id);

    if (indexDelete < 0) return;

    const newList = DB.productos.filter((product) => product.id !== +id);

    DB.productos = newList;

    saveToDatabase(DB);

    return newList;
};

module.exports = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteOneProduct,
};