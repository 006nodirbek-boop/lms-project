import roleService from "../services/roles.js"

class RoleController{

    async getAllRoles(req,res){
        let resData = await roleService.getRoles(req)

        return res.status(resData.status).json(resData)
    }

    async createRole(req, res,next){
        let resData = await roleService.createRole(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}



const roleController = new RoleController()
export default roleController