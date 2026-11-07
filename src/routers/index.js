import roleRouter from "./roles.js"
import userRouter from "./users.js"
import express from "express"

const appRouter = express.Router()

appRouter.use("/api/v1",roleRouter)
appRouter.use("/api/v1",userRouter)

export default appRouter