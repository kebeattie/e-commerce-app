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
        if(error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })

}


module.exports = {pool, getUsers};

