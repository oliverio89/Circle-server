
const router = require("express").Router()

const Post = require('./../models/Post.model')

router.get("/getAllPosts", (req, res) => {

    Post
        .find()
        .select({ timestamps: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => res.status(500).json(err))
})


router.get("/getOnePost/:post_id", (req, res, next) => {

    const { post_id } = req.params

    Post
        .findById(post_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.post("/savePost", (req, res) => {

    Post
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router