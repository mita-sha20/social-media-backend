const cloudinary = require('cloudinary')
const fs = require('fs')


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,  
});

exports.uploadImage = async(req,res)=>{
    try{
        const { path } = req.body
        const files =  Object.values(req.files).flat()
        const images = []
        for(const file of files){
            const url = await uploadToCloudinary(file,path)
            images.push(url)
            removeFile(file.tempFilePath)
        }
        res.json(images)
      }
      catch(error){
        return res.status(404).json({
              message: error.message
            })
      }
}

//get all

exports.listImage = async(req,res)=>{
  const {path,sort,max} = req.body

  cloudinary.v2.search
  .expression(`${path}`)
  .sort_by("public_id", `${sort}`)
  .max_results(max)
  .execute()
  .then((result)=>{
res.json(result)
  })
  .catch((error)=>{
    res.status(404).json({
      message: error.message
    })
  })
}

//upload to cloudinary fun

const uploadToCloudinary = async(file, path)=>{
    return new Promise((resolve)=>{
       cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
            folder: path
        },
        (err, res)=>{
          if(err){
            removeFile(file.tempFilePath)
            return res.status(404).json({
                message: "File upload failed"
              })
          }
          resolve({
            url: res.secure_url,
          })
        }
       )
    })
}

const removeFile =(path)=>{
    fs.unlink(path, (err)=>{
      if(err) throw err
    })
 }