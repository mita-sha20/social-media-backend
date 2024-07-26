const User = require("../model/userModel")

let getUser = async(req,res)=>{
    try{
      const {username} = req.params
      const getProfile = await User.findOne({username}).select("-password")
      if(!getProfile){
        return res.json({
          ok: false
        })
      }
      res.send(getProfile)
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = getUser;