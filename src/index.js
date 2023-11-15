const express=require("express");
const app=express();
const userRouter=require("./routes")
const logger=require("./utils/logger/logger")
const correlationId=require("./middlewares/setCorrelationId")
const {expressInfoLogger,expressErrorLogger}=require("./middlewares/winstonExpressMiddleware")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(correlationId)

// winston express info logger
app.use(expressInfoLogger)

app.use(userRouter)

// winston express error logger
app.use(expressErrorLogger);


app.use((error,req,res,next)=>{
    const errorObj={
        message: error?.message || "Something went wrong",
        correlationId:req.headers['x-correlation-id'],
        status: error?.status || 500,
    }
   
    logger.error(JSON.stringify(errorObj))

    res.status(errorObj.status).json(errorObj)
})




app.listen(4000,()=>{
    console.log("http://localhost:4000")
})