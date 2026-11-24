import express from "express"
import sectionController from "../controllers/sections.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"


const router = express.Router()

router
    .get("/sections/:courseId",authGuard,roleGuard("teacher","admin","student"),sectionController.getSectionsById)
    .post("/sections",authGuard,roleGuard("teacher","admin"),middleware.createSection,sectionController.createSection)
    .put("/sections/:sectionId",authGuard,roleGuard("teacher","admin"),sectionController.updateSection)
    .delete("/sections/:sectionId",authGuard,roleGuard("teacher","admin"),sectionController.deleteSection)

export default router