const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const userRouter = require('./Routes/user');
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');
const checkoutRouter = require('./Routes/checkout');
const cartRouter = require('./Routes/cart');
const loginRouter = require('./Routes/login');
const registrationRouter = require('./Routes/registration');
const port = process.env.port || 4001;

app.use(bodyParser.json());
app.use (
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(cors());
//Configure Router
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/login', loginRouter);
app.use('/registration', registrationRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
