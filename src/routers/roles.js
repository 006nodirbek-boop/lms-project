import express from "express"
import roleController from "../controllers/roles.js"

const router = express.Router()

router
    .get("/roles/all",roleController.getAllRoles)
    .post("/roles",roleController.createRole)

export default router