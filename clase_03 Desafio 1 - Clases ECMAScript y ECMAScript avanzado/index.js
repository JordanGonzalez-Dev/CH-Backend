class ProductManager{

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock, code){
        
        let id_product = (this.getProducts()).length;

        let producto = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            stock: stock,
            code: code,
            id: ++id_product
        }

        if (!title || !description || !price || !code || !stock) {
            return console.log("Todos los campos son obligatorios");
        }

        let codigo = this.products.find((prod) => prod.code == producto.code)

        if (codigo) {
            return "El código ya existe, ingrese uno nuevo"
        } else {
            this.products.push(producto);
            return this.products;
        }
    }

    getProductById(id_product){
        let producto = this.productos.find(producto => producto.id === id_product)

        if(producto){
            return producto;
        }else{
            return console.log("Not Found ♥");
        }
    }
}

const product = new ProductManager();
product.addProduct("")