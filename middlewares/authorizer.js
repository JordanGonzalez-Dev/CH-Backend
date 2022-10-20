//const url = ["/api/productos", '/api/productos/1','/api/productos/2', "/api/carrito"];

const admin = false;

const authorizer = (req, res, next) => {
    //const search = url.find((el) => el === req.url);

    if (admin) {
        next();

        return;
    }

    res.status(404).json({
        error: -1,
        descripcion: `Ruta: ${req.url}`,
        método: `${req.method}, no implementada!!!`,
    });

    return;
};

module.exports = authorizer;