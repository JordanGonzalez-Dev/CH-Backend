const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();
    const lastProduct = products[products.length - 1];
    const id = lastProduct ? lastProduct.id + 1 : 1;
    const newProduct = { id, ...product };
    products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(products));
    return newProduct;
  }

  getProducts() {
    const fileContent = fs.readFileSync(this.path, "utf-8");
    return fileContent ? JSON.parse(fileContent) : [];
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find((product) => product.id === id);
    return product;
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct, id };
      fs.writeFileSync(this.path, JSON.stringify(products));
      return products[index];
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(products));
      return deletedProduct;
    }
  }
}

module.exports = ProductManager;
