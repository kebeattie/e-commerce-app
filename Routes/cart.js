const express = require('express');
const cartRouter = express.Router();
const db = require('../DB/dbFunctions');

cartRouter.get('/', db.getCart);

module.exports =  cartRouter;