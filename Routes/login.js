const express = require('express');
const loginRouter = express.Router();
const db = require('../DB/db');

loginRouter.get('/', db.getUsers);

module.exports =  loginRouter;