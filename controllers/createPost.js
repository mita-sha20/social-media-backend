const Post = require('../model/Posts')

let createPost = async(req,res)=>{
    try{
      const post = await new Post(req.body).save()
      res.json(post)
    }
    catch(error){
        res.status(404).json({
            message: error.message
          })
    }
}

module.exports = createPost;