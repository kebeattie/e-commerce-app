const express = require('express');
const productsRouter = express.Router();
const db = require('../DB/dbFunctions');

productsRouter.get('/', db.getUsers);

module.exports =  productsRouter;