import userService from "../services/users.js"

class UserController{

    async getAdmins(req,res){
        let resData = await userService.getAdmins()

        return res.status(resData.status).json(resData)
    }


    async createAdmin(req,res){
        let resData = await userService.createAdmin(req)

        return res.status(resData.status).json(resData)
    }

    async createTeacher(req,res){
        let resData = await userService.createTeacher(req)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async deleteUser(req,res,next){
        let resData = await userService.deleteUser(req,next)

       if (resData) {
            return res.status(resData.status).json(resData)
       }
    }
}
const userController = new UserController()

export default userController