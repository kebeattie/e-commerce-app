const express = require('express');
const ordersRouter = express.Router();
const db = require('../DB/dbFunctions');

ordersRouter.get('/', db.getOrders);
ordersRouter.get('/order', db.getOrderById);

module.exports =  ordersRouter;