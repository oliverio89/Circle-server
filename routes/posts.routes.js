
const router = require("express").Router()

const { isAuthenticated } = require("../middleware/jwt.middleware")
const Post = require('./../models/Post.model')

router.get("/getAllPosts", isAuthenticated, (req, res, next) => {

    Post
        .find()
        .sort({ timestamps: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => res.status(500).json(err))
})


router.get("/getOnePost/:post_id", isAuthenticated, (req, res, next) => {

    const { post_id } = req.params

    Post
        .findById(post_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/savePost", isAuthenticated, (req, res, next) => {

    const { title, description, imageUrl } = req.body

    Post
        .create({ title, description, imageUrl, owner: req.payload._id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))


    router.post("/deletePost/:post_id", isAuthenticated, (req, res, next) => {

        const { post_id } = req.params

        Post
            .findByIdAndDelete(post_id)
            .then(response => res.json(response))
            .catch(err => next(err))
    })
})

module.exports = router 