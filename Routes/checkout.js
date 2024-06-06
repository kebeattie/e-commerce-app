const express = require('express');
const checkoutRouter = express.Router();
const db = require('../DB/db');

checkoutRouter.get('/', db.getUsers);

module.exports =  checkoutRouter;