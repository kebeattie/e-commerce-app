const express = require('express');
const loginRouter = express.Router();
const db = require('../DB/dbFunctions');
const passport = require('passport');
const localStrategy = require('../local-strategy');

loginRouter.post('/', passport.authenticate('local'), (req, res) => {

})

module.exports =  loginRouter;