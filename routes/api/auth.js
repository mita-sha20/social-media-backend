const express = require('express')
const router = express.Router()
const newuser = require('../../controllers/userController')
const verifiedUser = require('../../controllers/verifiedUser')
const login = require('../../controllers/loginController')
const reVerification = require('../../controllers/reVerification')
const findUser = require('../../controllers/findUser')
const resetCode = require('../../controllers/resetCode')
const verifyCode = require('../../controllers/verifyCode')
const authUser = require('../../middleware/auth')
const changePassword = require('../../controllers/changePassword')
const getUser = require('../../controllers/getUser')


router.post("/", newuser)
router.post('/activate' , authUser ,verifiedUser)
router.post('/login', login)
router.post('/reverification', authUser , reVerification)
router.post('/resetpassword',  findUser)
router.post('/resetCode',  resetCode)
router.post('/verifyresetCode',  verifyCode)
router.post('/changepassword',  changePassword)
router.get('/getuser/:username', authUser , getUser)


module.exports = router