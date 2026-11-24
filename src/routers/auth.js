import express from "express"
import authController from "../controllers/auth.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .post("/login",middleware.login,authController.login)
    .post("/register",middleware.login,authController.register)

export default router