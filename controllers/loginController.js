const User = require('../model/userModel')
const { jwToken } = require('../helpers/token');
const bcrypt = require('bcrypt')


let login = async(req,res)=>{
  try{
   const {email,password} = req.body
   const user = await User.findOne({email})
   if(!user){
    return res.status(400).json({
        message:"This email address is not connected to an account"
    })
   }
   const check = await bcrypt.compare(password, user.password)
   if(!check){
    return res.status(400).json({
        message:"Invalid credentials. Please try again"
    })
   }
   const token = jwToken({ id:user._id.toString() }, "7d")
   res.send({
    id:user._id,
    username: user.username,
    picture: user.picture,
    cpicture: user.cpicture,
    fName: user.fName,
    lName: user.lName,
    email: user.email,
    friends: user.friends,
    followers: user.followers,
    token: token,
    verified: user.verified,
    message: "Login success!"
   })
  }catch(error){
       res.status(404).json({
         message: error.message
       })
    }
}

module.exports = login