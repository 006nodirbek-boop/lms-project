import express from "express"
import courseController from "../controllers/courses.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/courses",courseController.getCourses)
    .get("/courses/my",authGuard,roleGuard("teacher","student"),courseController.getMyCourses)
    .get("/courses/all",authGuard,roleGuard("admin"),courseController.getAllCourses)
    .post("/courses",authGuard,roleGuard("teacher"),middleware.createCourse,courseController.createCourse)
    .put("/courses/aprove/:courseId",authGuard,roleGuard("admin"),courseController.aproveCourse)

export default router