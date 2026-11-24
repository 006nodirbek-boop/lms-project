import express from "express"
import categoryController from "../controllers/categories.js"
import authGuard from "../guards/auth-guard.js"
import {roleGuard} from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/categories/all",authGuard,roleGuard("admin"),categoryController.getAllCategories)
    .post("/categories",authGuard,roleGuard("admin"),middleware.createCategory,categoryController.createCategory)
    .put("/categories/:categoryId",authGuard,roleGuard("admin"),categoryController.updateCategory)
    .delete("/categories/:categoryId",authGuard,roleGuard("admin"),categoryController.deleteCategory)
export default router 