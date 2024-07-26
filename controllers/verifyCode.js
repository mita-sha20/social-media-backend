const Code = require("../model/Code");
const User = require("../model/userModel");

let verifyCode = async(req,res)=>{
    try{
      const {email,code} = req.body
      const user = await User.findOne({email})
      const decode = await Code.findOne({user: user._id})

      if(decode.code !== code){
        return res.status(400).json({
            message: "Code doesn't match"
        })
      }
      return res.status(200).json({
        message: "Thank you"
    })
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = verifyCode;