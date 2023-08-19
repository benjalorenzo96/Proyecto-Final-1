const express = require('express');
const petsRouter = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'uploads')); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

const pets = [];

petsRouter.get('/', (req, res) => {
  res.json(pets);
});

petsRouter.post('/', upload.single('file'), (req, res) => {
  const newPet = {
    name: req.body.name,
    thumbnail: `/uploads/${req.file.filename}` // Ruta de la imagen guardada
  };
  pets.push(newPet);
  res.status(201).json(newPet);
});

module.exports = petsRouter;

