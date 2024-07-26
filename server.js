const dotenv = require("dotenv")
dotenv.config()
const connect  = require("./database/dbconnection")
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes")

//database
connect()
//express middleware
const app = express()
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(router)


const Port = process.env.PORT || 8000

app.listen(Port, ()=>{
    console.log("hello this is node js second")
})