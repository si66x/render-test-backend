require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI).then(
    result=>console.log("berhasil connect"),
).catch(err=>console.log(err.message))

mongoose.set('strictQuery',false)

const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
})

noteSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject.__v
        delete returnObject._id
    }
})

const Note = new mongoose.model('Note',noteSchema)

module.exports = Note