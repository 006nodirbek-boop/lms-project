import categoriesService from "../services/categories.js";

class CategoryController{

    async getAllCategories(req,res,next){
        let resData = await categoriesService.getAllCategories()

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async createCategory(req,res,next){
        let resData = await categoriesService.createCategory(req,next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async updateCategory(req,res,next){
        let resData = await categoriesService.updateCategory(req,next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async deleteCategory(req,res,next){
        let resData = await categoriesService.deleteCategory(req,next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }


}


const categoryController = new CategoryController()

export default categoryController
