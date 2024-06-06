const express = require('express');
const productsRouter = express.Router();
const db = require('../DB/db');

productsRouter.get('/', db.getUsers);

module.exports =  productsRouter;