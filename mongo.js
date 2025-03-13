const mongoose = require('mongoose')

let notes = [
    {
      content: "HTML is easy",
      important: true
    },
    {
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content : String,
    important: Boolean
})

const noteModel = new mongoose.model('Note',noteSchema)

const note = new noteModel({
    content : "dharrel",
    important: true
})

noteModel.find({}).then(result=>{
    console.log(result)
})