import express from "express"
import examsController from "../controllers/exams.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/exams/:lessonId",authGuard,examsController.getAllExams)
    .post("/exams",authGuard,roleGuard("admin","teacher"),middleware.createExam,examsController.createExam)
    .put("/exams/:examId",authGuard,roleGuard("admin","teacher"),examsController.updateExam)
    .delete("/exams/:examId",authGuard,roleGuard("admin","teacher"),examsController.deleteExam)


export default router