const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./Routes/user')
const port = process.env.port || 4001;

app.use(bodyParser.json());
app.use (
    bodyParser.urlencoded({
        extended: true
    })
);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});



app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

module.exports = {app};