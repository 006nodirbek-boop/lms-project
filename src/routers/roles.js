import express from "express"
import roleController from "../controllers/roles.js"
import authGuard from "../guards/auth-guard.js"
import { roleGuard } from "../guards/role-guard.js"

const router = express.Router()

router
    .get("/roles/all",roleController.getAllRoles)
    .post("/roles",roleController.createRole)
    .delete("/roles/:roleId",authGuard,roleGuard("admin"),roleController.deleteRole)

export default router