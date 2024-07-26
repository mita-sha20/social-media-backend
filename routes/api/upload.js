const express = require('express')
const { uploadImage , listImage } = require('../../controllers/upload')
const uploadMiddleware = require('../../middleware/uploadMiddleware')
const router = express.Router()


router.post("/uploadimage", uploadMiddleware , uploadImage)
router.get("/listimage" , listImage)

module.exports = router