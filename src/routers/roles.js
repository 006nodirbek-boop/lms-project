import express from "express"
import roleController from "../controllers/roles.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/roles/all",roleController.getAllRoles)
    .post("/roles",authGuard,roleGuard("admin"),middleware.createRole,roleController.createRole)
    .put("/roles/:roleId",authGuard,roleGuard("admin"),roleController.updateRole)
    .delete("/roles/:roleId",authGuard,roleGuard("admin"),roleController.deleteRole)

export default router