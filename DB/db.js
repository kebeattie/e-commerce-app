//Set up DB connection
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: 'password',
    port: 5432
});

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}

const createUser = (req, res) => {
    const { id, password, email, firstname, lastname } = req.body;

    pool.query(
        'INSERT INTO users (id, password, email, firstname, lastname, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)',
        [id, password, email, firstname, lastname], (error, results) => {
            if (error) {
                console.log(error);
            }
            res.status(201).send(`User created with email: ${email}`) })
};


module.exports = { pool, getUsers, createUser };

