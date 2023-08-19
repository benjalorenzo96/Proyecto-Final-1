const express = require('express');
const app = express();
const path = require('path'); // Importar el módulo path
const ProductManager = require('./ProductManager'); 
const usersRouter = require('./usersRouter'); // Ruta al router de usuarios
const petsRouter = require('./petsRouter'); // Ruta al router de mascotas
const productManager = new ProductManager('Productos.json'); 

app.use(express.json()); // Middleware para manejar datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Configurar el uso de express.urlencoded para parsear datos de formularios

app.use('/api/users', usersRouter); // Conectar el router de usuarios
app.use('/api/pets', petsRouter); // Conectar el router de mascotas

// Configurar la carpeta 'public' como carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    
    try {
      const products = await productManager.getProducts();
      
      if (limit) {
        res.json(products.slice(0, limit));
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });
  
  app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
  
    try {
      const product = await productManager.getProductById(productId);
  
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener producto por ID' });
    }
  });
  
app.get('/saludo', (req, res) => {
    res.send('¡Hola a todos, pero ahora desde Express!');
  });
  
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
