const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')

const { isAuthenticated } = require('./../middleware/jwt.middleware')


router.post('/signup', (req, res, next) => {
    const { email, password, name, username, imageUrl, bio } = req.body
    console.log('HOLA ', req.body)
    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            console.log('USUARIO ENCONTRADO', foundUser)

            if (foundUser) {
                res.status(200).json({ message: "User already exists." })
                return

            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, name, imageUrl, bio })
        })
        .then((createdUser) => {
            console.log(createdUser)

            const { email, username, name, _id, imageUrl, bio } = createdUser
            const user = { email, username, name, _id, imageUrl, bio }
            res.status(201).json({ user })
        })
        .catch(err => next(err));
})



router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, imageUrl, name, bio, friends } = foundUser;

                const payload = { _id, email, username, imageUrl, name, bio, friends }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }

        })
        .catch(err => next(err));
});




router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router