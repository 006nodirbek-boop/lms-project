import express from "express"
import teacherController from "../controllers/teachers.js"
// import middleware from "../middleware/validations.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/teachers/all",authGuard,roleGuard("admin"),teacherController.getAllTeachers)
    // .post("/admins",authGuard,roleGuard("admin"),middleware.createUsers,userController.createAdmin)
    // .post("/teachers",userController.createTeacher)
    // .delete("/users/:userId",userController.deleteUser)

export default router