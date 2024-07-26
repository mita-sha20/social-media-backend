const User = require('../model/userModel')

let findUser = async(req,res)=>{
    try{
       const {email} = req.body
       const matchEmail = await User.findOne({email}).select("-password")
       if(!matchEmail){
        return res.status(404).json({
            message: "Email doesn't exist"
        })
       }
       res.status(200).json({
        email: matchEmail.email,
        picture: matchEmail.picture
       })
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = findUser;