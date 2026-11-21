import express from "express"
import studentsController from "../controllers/students.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"


const router = express.Router()

router
    // .get("/sections/:courseId",authGuard,roleGuard("teacher","admin"),sectionController.getSectionsById)
    .post("/students/courses/buy/:courseId",authGuard,roleGuard("student"),studentsController.buyCourses)

    .get("/students/courses/my",authGuard,roleGuard("student"),studentsController.getMyCourses)

export default router