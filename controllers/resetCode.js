const { generateCode } = require("../helpers/generateCode");
const { sendResetCode } = require("../helpers/mailer");
const Code = require("../model/Code");
const User = require("../model/userModel");

let resetCode = async(req,res)=>{
    try{
       const {email} = req.body
       const user = await User.findOne({email}).select("-password");
       await Code.findOneAndDelete({user:user._id})
       const code = generateCode(5)
       const saveCode = await new Code({
        user: user._id,
        code
       }).save()
       sendResetCode(user.email, user.fName, code)
       return res.status(200).json({
        message: "Reset code has been sent to your email"
       })
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = resetCode;