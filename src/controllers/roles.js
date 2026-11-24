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

    async updateRole(req, res, next) {
        let resData = await roleService.updateRole(req, next);

        if (resData) {
            return res.status(resData.status).json(resData);
        }
    }

    async deleteRole(req,res,next){
        let resData = await roleService.deleteRole(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}



const roleController = new RoleController()
export default roleController