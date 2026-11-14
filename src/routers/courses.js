import express from "express"
import courseController from "../controllers/courses.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"

const router = express.Router()

router
    .post("/courses",authGuard,roleGuard("teacher"),courseController.createCourse)

export default router