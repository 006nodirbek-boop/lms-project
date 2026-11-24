import express from "express"
import lessonsController from "../controllers/lessons.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/lessons/:sectionId",authGuard,lessonsController.getAllLessons)
    .post("/lessons",authGuard,roleGuard("admin","teacher"),middleware.createLesson,lessonsController.createLesson)
    .put("/lessons/:lessonId",authGuard,roleGuard("admin","teacher"),lessonsController.updateLesson)
    .delete("/lessons/:lessonId",authGuard,roleGuard("admin","teacher"),lessonsController.deleteLesson)

export default router