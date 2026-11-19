import express from "express"
import examsController from "../controllers/exams.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/exams/:lessonId",authGuard,examsController.getAllExams)
    .post("/exams",authGuard,roleGuard("admin","teacher"),examsController.createExam)

export default router