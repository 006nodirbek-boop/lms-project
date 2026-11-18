import express from "express"
import lessonsController from "../controllers/lessons.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/lessons/:sectionId",authGuard,lessonsController.getAllLessons)
    .post("/lessons",authGuard,roleGuard("admin","teacher"),lessonsController.createLesson)

export default router