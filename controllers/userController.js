const { sendVerifiedEmail } = require('../helpers/mailer');
const { jwToken } = require('../helpers/token');
const { validateEmail, validateLength, validateUsername } = require('../helpers/validation');
const User = require('../model/userModel')
const bcrypt = require('bcrypt')

let newuser = async(req,res)=>{
    try{
      const {
        fName,
        lName,
        username,
        email,
        password,
        bMonth,
        bDay,
        bYear,
        gender,
        verified
      } = req.body;

      if(!validateEmail(email)){
        return res.status(400).json(
          {
            message:"Invalid email address"
          }
        )
      }

      const checkMail = await User.findOne({email})

      if(checkMail){
        return res.status(400).json({
          message:"Email already exist"
        })
      }

      if(!validateLength(fName,3,15)){
        return res.status(400).json({
          message: "Firstname should be minimum 3 and maximum 15 characters"
        })
      }

      if(!validateLength(lName,3,15)){
        return res.status(400).json({
          message: "Lastname should be minimum 3 and maximum 15 characters"
        })
      }

      if(!validateLength(password,8,20)){
        return res.status(400).json({
          message: "Password should be minimum 8 and maximum 20 characters"
        })
      }

      //bcrypt password

      const crypted = await bcrypt.hash(password, 10)


      //validate username
        
      let tempUsername = fName + lName
      let finalUsername = await validateUsername(tempUsername)

      
     let user = new User({
        fName,
        lName,
        username: finalUsername,
        email,
        password : crypted,
        bMonth,
        bDay,
        bYear,
        gender,
        verified
     })
     user.save()

     const emailToken = jwToken({ id:user._id.toString() }, "30m")

     const url = `${process.env.BASE_URL}/activate/${emailToken}`
     sendVerifiedEmail(user.email,user.fName,url)

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
      message: "Registration success! Please activate your email to start"
     })

    } catch(error){
        res.status(404).json({
            message : "Can not create user"
        })
    }
}



module.exports = newuser;