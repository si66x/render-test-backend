const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }

const requestLogger = (request, response, next)=>{
    console.log("Body : ", request.body)``
    console.log("Method : ", request.method)
    console.log("Path : ", request.path)
    console.log("--------")
    next()
}
  
const unknownEndPoint = (req,res,next) =>{
    res.status(404).json({
        error : "unknown endpoint"
    })
}

morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})
const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/',(req,res)=>{
    res.send('kocak')
})

app.get('/api/notes/',(req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id',(req,res)=>{
    const id = req.params.id
    const note = notes.find(note=>note.id==id)
    res.json(note)
})

app.post('/api/notes/',(req,res)=>{
    const body = req.body
    const noteObj = {
        id: generateId(),
        content: body.content,
        important : body.important||false
    }
    notes = notes.concat(noteObj)
    res.json(noteObj)
})

app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{console.log("running on server ", PORT)})

module.exports = app
