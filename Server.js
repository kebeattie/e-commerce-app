const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const port = process.env.port || 4001;

app.use(bodyParser.json());
app.use (
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/users', db.getUsers);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})