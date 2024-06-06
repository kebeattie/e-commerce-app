const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./DB/dbFunctions');

// passport.serializeUser((user, done) => {
//     done(null, user.email);
// });

// passport.deserializeUser((email, done) => {
//     console.log('deserial');
//     try {
        
//         const findUser = db.findByEmail(email);
//         console.log(findUser);
//         if (!findUser) throw new Error ('User not found');
//         done(null, user);
//     } catch(error) {
//         done(error, null);
//     }
// })



passport.use(
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
        console.log(username, password);
        try {
            const findUser = await db.findByEmail(username);
            if (!findUser) throw new Error('User not found');
            if (findUser.password !== password) throw new Error('Invalid credentials');
            done(null, findUser);
    
        } catch(err) {
            done(err, null);
    }
        
    })
);