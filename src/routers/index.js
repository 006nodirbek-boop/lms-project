import roleRouter from "./roles.js"
import userRouter from "./users.js"
import authRouter from "./auth.js"
import teacherRouter from "./teachers.js"
import categoryRouter from "./categories.js"
import courseRouter from "./courses.js"

import express from "express"

const appRouter = express.Router()

appRouter.use("/api/v1",roleRouter)
appRouter.use("/api/v1",userRouter)
appRouter.use("/api/v1",authRouter)
appRouter.use("/api/v1",teacherRouter)
appRouter.use("/api/v1",categoryRouter)
appRouter.use("/api/v1",courseRouter)

export default appRouter