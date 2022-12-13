const router = require("express").Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
const User = require('./../models/User.model')

router.get("/giveMeUser/:user_id", isAuthenticated, (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .populate('friends')
        .populate('createdPosts')
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/editUser/:user_id", isAuthenticated, (req, res, next) => {
    const { user_id } = req.params
    const { name, bio, imageUrl } = req.body

    User
        .findByIdAndUpdate(user_id, { name, bio, imageUrl })
        .then((response) => {
            res.json(response)
        })
        .catch(err => next(err))
})

router.delete("/deleteUser/:user_id", isAuthenticated, (req, res, next) => {

    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/addFriend/:user_id', isAuthenticated, (req, res, next) => {
    const { user_id } = req.params
    const owner = req.payload._id

    User
        .findByIdAndUpdate(owner, { $addToSet: { "friends": user_id } })
        .then()
        .catch((err) => next(err))

})

router.post('/deleteFriend/:user_id', isAuthenticated, (req, res, next) => {
    const { user_id } = req.params
    const owner = req.payload._id

    User
        .findByIdAndUpdate(owner, { $pull: { "friends": user_id } })
        .then()
        .catch((err) => next(err))

})

module.exports = router




