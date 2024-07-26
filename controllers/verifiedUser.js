const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

let verifiedUser = async(req,res)=>{
   
    try{
     const verified = req.user.id
     const { token } = req.body 
     const user = jwt.verify(token,process.env.SECRET_TOKEN)
     const check = await User.findById(user.id)

     if(verified !== user.id){
      return res.status(400).json({
         message: "You don't have authorization to complete this operation"
     })
     }

     if(check.verified === true){
        return res.status(400).json({
            message: "This email is already verified"
        })
     }else{
        await User.findByIdAndUpdate(user.id , {verified:true})
        return res.status(200).json({
            message: "Account has been activated successfully"
        })
     }
    }catch(error){
       res.status(404).json({
         message: error.message
       })
    }
 }

module.exports = verifiedUser
