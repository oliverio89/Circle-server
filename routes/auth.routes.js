const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')

const { isAuthenticated } = require('./../middleware/jwt.middleware')



router.post('/signup', (req, res, next) => {
    const { email, password, username } = req.body


    // const { email, password, name, username, imageUrl, bio } = req.body




    if (password.length < 2) {
        res.status(400).json({ message: 'Password must have at least 3 characters' })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)
            console.log('hiiiii', { email, password: hashedPassword, username })
            return User.create({ email, password: hashedPassword, username })
            // return User.create({ email, password: hashedPassword, username, name, imageUrl, bio })
        })
        .then((createdUser) => {

            // const { email, username, name, _id, imageUrl, bio } = createdUser
            // const user = { email, username, name, _id, imageUrl, bio }

            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
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

                const { _id, email, username, imageUrl } = foundUser;

                const payload = { _id, email, username, imageUrl }

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
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        });
});




router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router