import express from "express"
import categoryController from "../controllers/categories.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/categories/all",authGuard,roleGuard("admin"),categoryController.getAllCategories)
    .post("/categories",authGuard,roleGuard("admin"),categoryController.createCategory)

export default router 