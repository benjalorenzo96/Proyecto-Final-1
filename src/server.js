const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(express.json());

const PRODUCTS_FILE = path.join(__dirname, 'productos.json');
const CARTS_FILE = path.join(__dirname, 'carrito.json');

// Leer contenido del archivo
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Escribir contenido en el archivo
async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error al escribir en el archivo:', error);
  }
}

// Manejo de rutas para productos
const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
  const limit = req.query.limit;
  try {
    const products = await readFile(PRODUCTS_FILE);
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

productsRouter.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const products = await readFile(PRODUCTS_FILE);
    const product = products.find((p) => p.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
});

productsRouter.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;
  try {
    const products = await readFile(PRODUCTS_FILE);
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct, id: productId };
      await writeFile(PRODUCTS_FILE, products);
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const products = await readFile(PRODUCTS_FILE);
    const updatedProducts = products.filter((p) => p.id !== productId);
    await writeFile(PRODUCTS_FILE, updatedProducts);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

app.use('/api/products', productsRouter);

// Manejo de rutas para carritos
const cartsRouter = express.Router();

cartsRouter.post('/', async (req, res) => {
  try {
    const carts = await readFile(CARTS_FILE);
    const newCart = {
      id: Date.now().toString(), // Generar un ID único basado en el timestamp
      products: []
    };
    carts.push(newCart);
    await writeFile(CARTS_FILE, carts);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

cartsRouter.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const carts = await readFile(CARTS_FILE);
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos del carrito' });
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity || 1;

  try {
    const carts = await readFile(CARTS_FILE);
    const cartIndex = carts.findIndex((c) => c.id === cartId);

    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const productIndex = cart.products.findIndex((p) => p.product === productId);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity: quantity });
      }

      await writeFile(CARTS_FILE, carts);
      res.status(201).json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
