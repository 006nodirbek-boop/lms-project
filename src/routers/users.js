import express from "express"
import userController from "../controllers/users.js"
import middleware from "../middleware/validations.js"

const router = express.Router()

router
    .get("/admins",userController.getAdmins)
    .post("/admins",middleware.createUsers,userController.createAdmin)
    .post("/teachers",userController.createTeacher)
    .delete("/users/:userId",userController.deleteUser)

export default router