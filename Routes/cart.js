const express = require('express');
const cartRouter = express.Router();
const db = require('../DB/dbFunctions');

cartRouter.get('/', db.getCart);

cartRouter.post('/addToCart/:id', async (req, res, next) => {
    const {id} = req.params;
    const {quantity, email} = req.body;
    try {
        
        const result = await db.addToCart(id, quantity, email);
        if(result === null) {res.send('Product not found or it is already in your cart')}
        else {
            console.log(`Item of id ${id} added to cart`);
        res.send('item added');
        }
        
    } catch(err) {
        res.redirect('/');
    }
});

module.exports =  cartRouter;