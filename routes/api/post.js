const express = require('express')
const router = express.Router()
const createPost = require('../../controllers/createPost')
const getAllPosts = require('../../controllers/getAllPosts')
const authUser = require('../../middleware/auth')


router.post("/createpost", authUser , createPost)
router.get("/getallposts", authUser, getAllPosts)


module.exports = router