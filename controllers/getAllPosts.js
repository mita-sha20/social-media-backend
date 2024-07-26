const Post = require('../model/Posts')

let getAllPosts = async(req,res)=>{
    try{
       const post = await Post.find().populate("user" , "picture cpicture fName lName username").sort({createdAt : -1})
       res.json(post)
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = getAllPosts;