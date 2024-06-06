const express = require('express');
const userRouter = express.Router();
const db = require('../db');

userRouter.get('/', db.getUsers);

module.exports =  userRouter ;