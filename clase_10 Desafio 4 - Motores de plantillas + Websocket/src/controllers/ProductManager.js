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

  async #_loadData() {
    try {
      const productsFile = await fs.readFile(this.#path, "utf-8");
      const products = JSON.parse(productsFile);
      this.#products = [...products];
      this.#autoID = products.at(-1).id + 1;

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
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
      } = product;
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined ||
        category === undefined ||
        status === undefined
      ) {
        throw new Error("Todos los campos deben ser completados");
      }
      if (!title.trim() || !description.trim() || !price || !code.trim()) {
        throw new Error("Error, Todos los campos deben ser completados");
      }

      await this.#_loadData();
      if (this.#products.length !== 0) {
        const productExist = this.#products.find(
          (element) => element.code === product.code
        );
        if (productExist) {
          throw new Error("Error, Ya existe un producto con el mismo codigo");
        }
      }
      this.#products.push({ ...product, id: this.#autoID });
      await fs.writeFile(
        this.#path,
        JSON.stringify(this.#products, null, 2),
        "utf-8"
      );
      return { error: false, data: "Producto agregado con éxito!" };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }
  async getProducts() {
    try {
      const productsFile = await this.#_loadData();
      this.#products = [...productsFile];
      return productsFile;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(productId) {
    try {
      await this.#_loadData();

      if (this.#products.length === 0) {
        throw new Error("No sepuede obtener el producto, La lista esta vacía");
      }
      const product = this.#products.find(
        (element) => element.id === productId
      );
      if (!product) {
        throw new Error(`El producto con id ${productId} no existe`);
      }

      return { error: false, data: product };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }

  async update(productId, product) {
    try {
      const productToUpdate = await this.getProductById(productId);
      if (productToUpdate.error) {
        throw new Error(productToUpdate.message);
      }
      const index = this.#products.findIndex(
        (element) => element.id === productId
      );
      Object.assign(this.#products.at(index), product);

      await fs.writeFile(
        this.#path,
        JSON.stringify(this.#products, null, 2),
        "utf-8"
      );
      return {
        error: false,
        data: `El producto con id ${productId} fue actualizado con exito.`,
      };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }
  async delete(productId) {
    try {
      await this.#_loadData();
      if (this.#products.length === 0) {
        throw new Error("La lista esta vacía");
      }
      const exist = this.#products.find((element) => element.id === productId);
      if (!exist) {
        throw new Error(
          `El producto con id ${productId} no se encuentra en la base de datos.`
        );
      }
      await fs.writeFile(
        this.#path,
        JSON.stringify(
          this.#products.filter((element) => element.id !== productId),
          null,
          2
        ),
        "utf-8"
      );
      return { error: false, data: "Producto eliminado" };
    } catch (error) {
      return { error: true, message: error.message };
    }
  }
}

export default ProductManager;
