import express from "express"
import homeworksController from "../controllers/homeworks.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/homeworks/:lessonId",authGuard,homeworksController.getAllHomeworks)
    .post("/homeworks",authGuard,roleGuard("admin","teacher"),homeworksController.createHomework)
    .put("/homeworks/:homeworkId",authGuard,roleGuard("admin","teacher"),homeworksController.updateHomework)
    .delete("/homeworks/:homeworkId",authGuard,roleGuard("admin","teacher"),homeworksController.deleteHomework)

export default router