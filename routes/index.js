const express = require('express')
const router = express.Router()
const api = require('./api')

const baseapi = process.env.BASE_API_URL
router.use(baseapi,api)

module.exports = router