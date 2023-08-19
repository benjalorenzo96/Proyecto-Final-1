const fs = require('fs/promises');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios.');
      return;
    }

    const isCodeRepeated = await this.isCodeRepeated(code);
    if (isCodeRepeated) {
      console.log(`El código "${code}" ya está en uso.`);
      return;
    }

    try {
      const products = await this.getProducts();
      const product = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      products.push(product);
      await fs.writeFile(this.path, JSON.stringify(products, null, 2));
      console.log('Producto agregado con éxito.');
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.log('Producto no encontrado.');
    }
    return product;
  }

  async isCodeRepeated(code) {
    const products = await this.getProducts();
    return products.some((product) => product.code === code);
  }
}

const productManager = new ProductManager('Productos.json');

async function main() {
  await productManager.addProduct('Producto 1', 'Descripción del producto 1', 100, 'thumbnail1.jpg', 'PROD001', 50);
  await productManager.addProduct('Producto 2', 'Descripción del producto 2', 200, 'thumbnail2.jpg', 'PROD002', 30);
  await productManager.addProduct('Producto 3', 'Descripción del producto 3', 300, 'thumbnail3.jpg', 'PROD003', 70);

  const products = await productManager.getProducts();
  console.log(products);

  const productById = await productManager.getProductById(1);
  console.log(productById);

  const productByIdNotFound = await productManager.getProductById(3);
}

main();

module.exports = ProductManager;
