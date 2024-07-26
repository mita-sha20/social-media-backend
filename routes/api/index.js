const express = require('express')
const router = express.Router()
const auth = require('./auth')
const allPost = require('./post')
const upload = require('./upload')

router.use('/auth',auth)
router.use('/posts',allPost)
router.use('/upload',upload)


module.exports = router