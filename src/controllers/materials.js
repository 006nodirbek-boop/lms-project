import materialsService from "../services/materials.js";

class MaterialsController{

    async getAllMaterials(req,res,next){
        let resData = await materialsService.getAllMaterials(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async createMaterial(req,res,next){
        let resData = await materialsService.createMaterial(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async deleteMaterial(req, res, next) {
        let resData = await materialsService.deleteMaterial(req, next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async updateMaterial(req, res, next) {
        let resData = await materialsService.updateMaterial(req, next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const materialsController = new MaterialsController()
export default materialsController