const errorHandler = (error,req,res,next) =>{
    if(error.name=="CastError"){
        res.status(404).json({
            error : "malformatted id"
        }       
        )
    }
}

module.exports = errorHandler