import express from "express"
import { configDotenv } from "dotenv"
import appRouter from "./routers/index.js"
import fileUpload from "express-fileupload"
import fs from "fs"
import path from "path"

configDotenv()


const app = express()
app.use(express.json())
app.use(fileUpload)

app.use(appRouter)

app.use((error,req,res,next)=>{
    if (error.status < 500) {
        res.status(error.status).json({
            status:error.status,
            message:error.message
        })
    } else {
        fs.appendFileSync(path.join(process.cwd(),"src","log","logger.txt"),
            `[${new Date().toLocaleString()}]_${req.method}_${req.url}_${error.message}\n`)
        
        res.status(error.status).json({
            status:error.status,
            message:"Internal sever error"
        })
    }
    
})



// app.use((error, req, res, next) => {
//     const statusCode = error.status || error.statusCode || 500;

//     if (statusCode < 500) {
//         return res.status(statusCode).json({
//             status: statusCode,
//             message: error.message
//         });
//     }

//     fs.appendFileSync(
//         path.join(process.cwd(), "src", "log", "logger.txt"),
//         `[${new Date().toLocaleString()}]_${req.method}_${req.url}_${error.message}\n`
//     );

//     return res.status(statusCode).json({
//         status: statusCode,
//         message: error.message || "Internal Server Error"
//     });
// });


app.listen(process.env.PORT,() => console.log("Server is running...."))