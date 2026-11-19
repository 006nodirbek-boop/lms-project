import homeworkService from "../services/homeworks.js";

class HomeworkController{

    async getAllHomeworks(req,res,next){
        let resData = await homeworkService.getAllHomeworks(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async createHomework(req,res,next){
        let resData = await homeworkService.createHomework(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }
}

const homeworkController = new HomeworkController()
export default homeworkController