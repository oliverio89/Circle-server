const router = require("express").Router()
const User = require('./../models/User.model')
const { isAuthenticated } = require("../middleware/jwt.middleware")
const Post = require('./../models/Post.model')

router.get("/getAllPosts", isAuthenticated, (req, res, next) => {

    Post
        .find()
        .sort({ createdAt: -1 })
        .populate({ path: "owner" })
        .populate({ path: "comments", populate: { path: "owner" } })
        .sort({ timestamps: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => next(err));
})

router.get("/getOnePost/:post_id", isAuthenticated, (req, res, next) => {

    const { post_id } = req.params

    Post
        .findById(post_id)
        .populate({ path: "comments", populate: { path: "owner" } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post("/savePost", isAuthenticated, (req, res, next) => {

    const { title, description, imageUrl, lat, lng } = req.body
    const owner = req.payload
    console.log("hiiiooooooo", owner)

    const location = {
        type: "Point",
        coordinates: [lat, lng],
    };

    let postCreado

    Post
        .create({ title, description, imageUrl, owner, location })
        .then(response => {
            res.json(response)

                .create({ title, description, imageUrl, owner })
                .then(postCreated => {
                    postCreado = postCreated
                    return User.findByIdAndUpdate(owner, { $addToSet: { "createdPosts": postCreado._id } }, { new: true })
                })
                .then(usuario => res.json(usuario))

                .catch(err => res.status(500).json(err))

        })
})

router.put("/editPost/:post_id", isAuthenticated, (req, res, next) => {
    const { post_id } = req.params
    const { title, description, imageUrl } = req.body


    Post
        .findByIdAndUpdate(post_id, { title, description, imageUrl })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put("/likePost/:comenData", isAuthenticated, (req, res, next) => {
    const currentUser = req.payload._id
    const comenData = req.params

    Post
        .findByIdAndUpdate(comenData.comenData, { $addToSet: { 'likes': currentUser } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

// quitar el like

router.put("/dislikePost/:disLikeData", isAuthenticated, (req, res, next) => {
    const currentUser = req.payload._id
    const disLikeData = req.params

    Post
        .findByIdAndUpdate(disLikeData.disLikeData, { $pull: { 'likes': currentUser } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})

//reportar un post

router.put("/reportPost/:report", isAuthenticated, (req, res, next) => {
    const currentUser = req.payload._id
    const report = req.params

    Post
        .findByIdAndUpdate(report.report, { $addToSet: { 'reportes': currentUser } }, { new: true })
        .then(response => res.json(response))
        .catch(err => next(err))
})


router.delete("/deletePost/:post_id", isAuthenticated, (req, res, next) => {

    const { post_id } = req.params

    Post
        .findByIdAndDelete(post_id)
        .then(response => res.json(response))
        .catch(err => next(err))


})


module.exports = router 