import sectionService from "../services/sections.js";

class SectionController{
    async createSection(req,res,next){
        const resData = await sectionService.createSection(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const sectionController = new SectionController()
export default sectionController