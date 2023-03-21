class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, stock, code) {
    let id_product = this.getProducts().length;

    let producto = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
      code: code,
      id: ++id_product,
    };

    if (!title || !description || !price || !code || !stock) {
      return console.log("Todos los campos son obligatorios");
    }

    let codigo = this.products.find((prod) => prod.code === producto.code);

    if (codigo) {
      return console.log("El código ya está en uso, ingrese uno nuevo");
    } else {
      this.products.push(producto);
      return this.products;
    }
  }

  getProductById(id_product) {
    let producto = this.products.find((producto) => producto.id == id_product);

    if (producto) {
      return producto;
    } else {
      return console.log("Not Found");
    }
  }
}

const product = new ProductManager();
product.addProduct(
  "SSD Kingston 480GB",
  "Considerado un dispositivo de alto rendimiento, la unidad en estado sólido A400 de Kingston está diseñada para las personas más exigentes.",
  12299,
  "#",
  100,
  500
);
product.addProduct(
  "SSD HyperX Cloud Stinger Core",
  "¡Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida.",
  14477,
  "#",
  50,
  650
);
product.addProduct(
  "Razer DeathAdder Essential",
  "El mouse te ofrecerá la posibilidad de marcar la diferencia y sacar ventajas en tus partidas. Su conectividad y sensor suave ayudará a que te desplaces rápido por la pantalla.",
  11579,
  "#",
  30,
  500
);

console.log(product.getProductById(1));
