const mongoose = require("mongoose")

const {ObjectId} = mongoose.Schema

const postModel = new mongoose.Schema({
   type:{
    type: String,
    enum: ["picture", "cpicture", null],
    default: null
   },
   images:{
    type: Array
   },
   text:{
    type: String
   },
   background:{
    type:String
   },
   user:{
    type: ObjectId,
    ref: "User",
   },
   comments:[
    {
        comment:{
            type: String
        },
        image:{
            type: String
        },
        commentedBy:{
            type: ObjectId,
            ref: "User",
        },
        commentedAt:{
            type: Date,
            require: true
        }
    }
]
},{
    timestamps: true
})

module.exports = mongoose.model("Post",postModel)