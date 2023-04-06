import fs from "fs/promises";

class ProductManager {
  #autoID;
  #path;
  #products;

  constructor(pathFile) {
    this.#path = pathFile;
    this.#autoID = 1;
    this.#products = [];
  }

  async _loadData() {
    try {
      const productsFile = await fs.readFile(this.#path, "utf-8");
      const products = JSON.parse(productsFile);
      this.#products = [...products];
      return products;
    } catch (error) {
      console.log("El archivo no existe");
      console.log(`creando ${this.#path} ...`);
      await fs.writeFile(this.#path, JSON.stringify([]), "utf-8");
      return [];
    }
  }
  async addProduct(product) {
    try {
      const { title, description, price, thumbnail, code, stock } = product;
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        throw new Error("Todos los campos deben ser completados");
      }
      if (
        !title.trim() ||
        !description.trim() ||
        !price ||
        !thumbnail.trim() ||
        !code.trim()
      ) {
        throw new Error("Error, Todos los campos deben ser completados");
      }
      const productsFile = await this._loadData();
      if (productsFile.length !== 0) {
        const productExist = productsFile.find(
          (element) => element.code === product.code
        );
        if (productExist) {
          throw new Error("Error, ya existe un producto con el mismo codigo");
        }
        this.#autoID = productsFile[productsFile.length - 1].id + 1;
      }
      productsFile.push({ ...product, id: this.#autoID });
      await fs.writeFile(
        this.#path,
        JSON.stringify(productsFile, null, 2),
        "utf-8"
      );
      return "Producto agregado con éxito!";
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getProducts() {
    try {
      const productsFile = await this._loadData();
      this.#products = [...productsFile];
      return productsFile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(productId) {
    try {
      const productsFile = await this._loadData();
      this.#products = [...productsFile];
      if (productsFile.length === 0) {
        throw new Error("La lista esta vacía");
      }
      const product = productsFile.find((element) => element.id === productId);
      if (!product) {
        throw new Error(`El producto con id ${productId} no existe`);
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(productId, product) {
    const productToUpdate = await this.getProductById(productId);
    try {
      const index = this.#products.findIndex(
        (element) => element.id === productId
      );
      if (index === -1) {
        throw new Error("el producto no se encuentra");
      }
      this.#products.splice(index, 1, Object.assign(productToUpdate, product));
      await fs.writeFile(
        this.#path,
        JSON.stringify(this.#products, null, 2),
        "utf-8"
      );
      return this.#products;
    } catch (error) {
      throw new Error(`No se puede actualizar el producto: ${error.message}`);
    }
  }
  async delete(productId) {
    try {
      const productsFile = await this._loadData();
      if (productsFile.length === 0) {
        throw new Error("La lista esta vacía");
      }
      const newProducts = productsFile.filter(
        (element) => element.id !== productId
      );
      this.#products = [...newProducts];
      await fs.writeFile(
        this.#path,
        JSON.stringify(newProducts, null, 2),
        "utf-8"
      );
      return "Elemento eliminado!";
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ProductManager;
