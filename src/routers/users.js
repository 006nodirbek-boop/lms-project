import express from "express"
import userController from "../controllers/users.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/admins",userController.getAdmins)
    .post("/users",middleware.createUsers,userController.createUser)

export default router