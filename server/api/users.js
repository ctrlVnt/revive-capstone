const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const SALT_ROUNDS = 10;
const client = require('../db/client')

const { 
    createUser, 
    getAllUsers,
    getUserByEmail
} = require('../db/sqlHelperFunctions/users.js');

// GET - /api/users - get all users
router.get('/', async(req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        console.log('error from api router', error);
        next(error);
    }
});

// POST - /api/users/register - create a new user
router.post('/register', async (req, res, next) => {
    try {
        const { firstname, lastname, username, password, email } = req.body;
        const checkUserExistsQuery = `
        SELECT * FROM users 
        WHERE username = $1 
        OR email = $2 
        LIMIT 1
        ;`
        const existingUser = await client.query(checkUserExistsQuery, [username, email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await createUser({ firstname, lastname, username, email, password: hashedPassword });
        delete user.password;
        
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

        res.cookie('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });
        
        delete user.password;

        res.send({ token, user });
    } catch (error) {
        console.log('error from POST api router', error);
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const users = await getUserByEmail(email);

        if (users.length === 1) {
            const user = users[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
                const token = jwt.sign(user, JWT_SECRET);

                res.cookie('token', token, {
                    sameSite: 'strict',
                    httpOnly: true,
                    signed: true
                });

                delete user.password;

                res.send({ token, user });
            } else {
                res.status(401).send({ error: 'Invalid password' });
            }
        } else {
            res.status(401).send({ error: 'User not found' });
        }
    } catch (error) {
        console.log('error from post api router with login', error);
        next(error);
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        res.clearCookie('token', {
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });
        res.send({
            loggedIn: false,
            message: 'Logged Out',
        });
    } catch (error) {
        console.log('error from post api router with logout', error);
        next(error);
    }
});

module.exports = router;

