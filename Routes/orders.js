const express = require('express');
const ordersRouter = express.Router();
const db = require('../DB/dbFunctions');

ordersRouter.get('/', db.getUsers);

module.exports =  ordersRouter;