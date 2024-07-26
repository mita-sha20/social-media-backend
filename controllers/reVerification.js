const { sendVerifiedEmail } = require("../helpers/mailer");
const { jwToken } = require("../helpers/token");
const User = require("../model/userModel");


let reVerification = async(req,res)=>{
   try{
    const id = req.user.id;
    const user = await User.findById(id)
    if(user.verified === true){
        return res.status(400).json({
            message: "This account is already activated"
        })
    }

    const emailToken = jwToken({ id:user._id.toString() }, "50m")
    const url = `${process.env.BASE_URL}/activate/${emailToken}`
    sendVerifiedEmail(user.email,user.fName,url)

    return res.status(200).json({
        message: "Email verification link has been sent to your account"
    })
s
   }catch(error){
    res.status(404).json({
        message: error.message
    })
   }
}

module.exports = reVerification;