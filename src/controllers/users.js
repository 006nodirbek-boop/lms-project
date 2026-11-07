import userService from "../services/users.js"

class UserController{

    async getAdmins(req,res){
        let resData = await userService.getAdmins()

        return res.status(resData.status).json(resData)
    }


    async createUser(req,res){
        let resData = await userService.createUser(req)

        return res.status(resData.status).json(resData)
    }
}
const userController = new UserController()

export default userController