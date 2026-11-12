import express from "express"
import userController from "../controllers/users.js"
import middleware from "../middleware/validations.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/admins",userController.getAdmins)
    .post("/admins",authGuard,roleGuard("admin, teacher"),middleware.createUsers,userController.createAdmin)
    .post("/teachers",userController.createTeacher)
    .delete("/users/:userId",userController.deleteUser)

export default router