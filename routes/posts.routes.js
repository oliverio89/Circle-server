
const router = require("express").Router()

const { isAuthenticated } = require("../middleware/jwt.middleware")
const Post = require('./../models/Post.model')

router.get("/getAllPosts", isAuthenticated, (req, res, next) => {

    Post
        .find()
        .populate({ path: "comments", populate: { path: "owner" } })
        // .populate({ path: "likes" })
        .sort({ timestamps: 1 })
        .then(response => setTimeout(() => res.json(response), 1000))
        .catch(err => next(err));
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
    const { _id: owner } = req.payload


    Post
        .create({ title, description, imageUrl, owner })
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => res.status(500).json(err))

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
    console.log("hiii I'm", currentUser)
    const comenData = req.params
    console.log("hiii ooooooooiiiiii", comenData.comenData)

    Post
        .findByIdAndUpdate(comenData.comenData, { $addToSet: { 'likes': currentUser } }, { new: true })
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