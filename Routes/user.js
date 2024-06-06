const express = require('express');
const userRouter = express.Router();
const db = require('../DB/dbFunctions');

userRouter.get('/', db.getUsers);





module.exports =  userRouter ;