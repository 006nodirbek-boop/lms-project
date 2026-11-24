import express from "express"
import teacherController from "../controllers/teachers.js"
// import middleware from "../middleware/validations.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/teachers/all",authGuard,roleGuard("admin"),teacherController.getAllTeachers)
    .put("/teachers/:teacherId",authGuard,roleGuard("admin"),teacherController.updateTeacher)
    .delete("/teachers/:teacherId",authGuard,roleGuard("admin"),teacherController.deleteTeacher)


export default router