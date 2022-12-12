const router = require("express").Router()
const Post = require('./../models/Post.model')
const { isAuthenticated } = require("../middleware/jwt.middleware")
const Comment = require('./../models/Comment.model')

router.post("/saveComment/:post_id", isAuthenticated, (req, res, next) => {
    const owner = req.payload._id
    const { description } = req.body
    const { post_id } = req.params


    let commentId

    Comment
        .create({ owner, description })
        .then(comment => {
            commentId = comment._id.toString()
            return Post.findByIdAndUpdate(post_id, { $push: { 'comments': commentId } }, { new: true })
        })
        .then((post) => { res.json(post) })
        .catch(err => res.status(500).json(err))
})


router.delete("/deleteComment/:comment_id", isAuthenticated, (req, res, next) => {
    const { comment_id } = req.params
    Comment
        .findByIdAndDelete(comment_id)
        .then(response => res.json(response))
        .catch(err => next(err))


})

module.exports = router



