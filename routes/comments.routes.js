const router = require("express").Router()

// const { isAuthenticated } = require("../middleware/jwt.middleware")
const Comment = require('./../models/Comment.model')

// router.post("/saveComment", isAuthenticated, (req, res, next) =>
router.post("/saveComment", (req, res, next) => {
    const { _id: owner } = req.params
    const { description } = req.body

    Comment
        .create({ owner, description })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


module.exports = router 