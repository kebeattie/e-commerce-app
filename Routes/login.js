const express = require('express');
const loginRouter = express.Router();
const db = require('../DB/dbFunctions');

loginRouter.get('/', db.getUsers);

module.exports =  loginRouter;