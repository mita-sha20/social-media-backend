// const Code = require("../model/Code");
const User = require("../model/userModel");
const bcrypt = require('bcrypt')

let changePassword = async(req,res)=>{
    try{
      const {email,password} = req.body
      const cryptedPassword = await bcrypt.hash(password,10)
      await User.findOneAndUpdate({email}, {password: cryptedPassword})
      return res.status(200).json({
        message: "Passowrd successfully changed"
    })
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = changePassword;