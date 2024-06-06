const express = require('express');
const registrationRouter = express.Router();
const db = require('../DB/db');

registrationRouter.post('/', db.createUser);

module.exports =  registrationRouter;