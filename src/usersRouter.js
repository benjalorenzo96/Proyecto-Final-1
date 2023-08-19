const express = require('express');
const usersRouter = express.Router();

const users = []; 

usersRouter.get('/', (req, res) => {
  res.json(users);
});

usersRouter.post('/', (req, res) => {
  const newUser = req.body; 
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = usersRouter;
