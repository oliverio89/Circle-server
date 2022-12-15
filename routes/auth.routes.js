const router = require("express").Router()
const User = require("../models/User.model")


const { isAuthenticated } = require('./../middleware/jwt.middleware')


router.post('/signup', (req, res, next) => {
    const { email, password, name, username, imageUrl, bio } = req.body



    User
        .create({ email, password, username, name, imageUrl, bio, })

        .then((createdUser) => {


            const { email, username, name, _id, imageUrl, bio } = createdUser
            const user = { email, username, name, _id, imageUrl, bio }
            res.status(201).json({ user })
        })
        .catch(err => next(err));
})



router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ['Indica email y contraseña'] });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser && foundUser.validatePassword(password)) {
                res.status(200).json({ authToken: foundUser.signToken() })
            }
            else {
                res.status(401).json({ errorMessages: ['Usuario o contraseña incorrectos'] });
            }

        })
        .catch(err => next(err));
});

router.post('/refreshToken', isAuthenticated, (req, res, next) => {

    const tokenId = req.payload._id

    User
        .findById(tokenId)
        .then((foundUser) => {


            const { _id, email, username, imageUrl, name, bio, role, friends } = foundUser;


            const payload = { _id, email, username, imageUrl, name, bio, role, friends }


            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )


            res.status(200).json({ authToken })


        })
        .catch(err => next(err));
});




router.get('/verify', isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})


module.exports = router