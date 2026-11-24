import sectionService from "../services/sections.js";

class SectionController{

    async getSectionsById(req, res, next){
        const resData = await sectionService.getSectionsById(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }


    async createSection(req, res, next){
        const resData = await sectionService.createSection(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async updateSection(req, res, next){
        const resData = await sectionService.updateSection(req,next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async deleteSection(req, res, next){
        const resData = await sectionService.deleteSection(req,next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const sectionController = new SectionController()
export default sectionController