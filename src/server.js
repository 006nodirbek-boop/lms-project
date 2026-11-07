import express from "express"
import { configDotenv } from "dotenv"
import appRouter from "./routers/index.js"
configDotenv()


const app = express()
app.use(express.json())
app.use(appRouter)

app.listen(process.env.PORT,() => console.log("Server is running...."))