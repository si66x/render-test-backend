const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./model/note')
const middlewareHandler = require('./middleware/middleware')



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
   
})

app.get('/api/notes/',(req,res)=>{
  Note.find({}).then(
    result => res.send(result)
  )
})

app.get('/api/notes/:id',(req,res,next)=>{
    const id = req.params.id
    Note.findById(id).then(
      result=>res.json(result)
    ).catch(
      err=> next(err)
    )
})

app.post('/api/notes/',(req,res,next)=>{
    const body = req.body
    const noteObj = new Note({
      content : body.content,
      important : body.important
    })

    noteObj.save().then(
        result=>res.json(result)
      ).catch(
        err=>console.log(err)
      )
    
})

app.use(middlewareHandler)

app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{console.log("running on server ", PORT)})

module.exports = app
