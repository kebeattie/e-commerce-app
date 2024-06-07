const pool = require('./db');
const generateUserId = require('../helperFunctions');
const bCrypt = require('bcrypt');

//Generate a salt to be added to our hashed passwords 
const getSalt = async () => {
    return await bCrypt.genSalt(10);
}

const salt = getSalt();

//Return all users and their information
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}


//Return a specific user by their email
const findByEmail = async (email) => {

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows?.length) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }


}

//Create a new user and store them in the DB
const createUser = async (req, res) => {

    const { password, email, firstname, lastname } = req.body;
    const existingUser = await findByEmail(email);
    if (existingUser == null) {

        //Salt and hash passwords so they are safe
        
        const hashedPassword = await bCrypt.hash(password, await salt);

        const id = generateUserId();
        pool.query(
            'INSERT INTO users (id, password, email, firstname, lastname, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)',
            [id, hashedPassword, email, firstname, lastname], (error, results) => {
                if (error) {
                    console.log(error);
                }
                res.status(201).send(`User created with email: ${email}`)
            })
    } else {
        res.send(`${existingUser} is already registered!`);
    }

};

//Allow a user to update their password

const changePassword = async (email, newPassword) => {

    //Grab new password from request body then hash and salt
    const existingUser = await findByEmail(email);

    if (existingUser) {
        const hashedNewPassword = await bCrypt.hash(newPassword, await salt);
        pool.query(
            'UPDATE users SET password=$1, modified_at=current_timestamp WHERE email=$2',
            [hashedNewPassword, email], (error, results) => {
                if (error) {
                    console.log(error);
                    return(null)
                }
                
            }

        )
        return(newPassword);
    } else {
        return(null);
    }
}

//Return all products

const getProducts = (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.log(error)
        }
        res.status(200).json(results.rows);
    })

}

const getProductsByCategory = async(category) => {
    try {
        const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
        if (result.rows?.length) {
         return await result.rows;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsers, createUser, findByEmail, changePassword, getProducts, getProductsByCategory };