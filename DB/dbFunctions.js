const pool = require('./db');
const generateUserId = require('../helperFunctions');

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}

const findByEmail = async (email) => {

    try{
       const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

       if(result.rows?.length) {
        return result.rows[0];
       } else {
        return null;
       }
    } catch (error) {
        console.log(error);
    }
  

}

const createUser = async (req, res) => {
    const { password, email, firstname, lastname } = req.body;
    const existingUser = await findByEmail(email);
    if (existingUser == null) {
        const id = generateUserId();
        pool.query(
            'INSERT INTO users (id, password, email, firstname, lastname, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)',
            [id, password, email, firstname, lastname], (error, results) => {
                if (error) {
                    console.log(error);
                }
                res.status(201).send(`User created with email: ${email}`)
            })
    } else {
        res.send(`${existingUser} is already registered!`);
    }

};

module.exports = { getUsers, createUser, findByEmail };