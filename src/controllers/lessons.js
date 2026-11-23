import lessonsService from "../services/lessons.js";

class LessonController{

    async getAllLessons(req,res,next){
        let resData = await lessonsService.getAllLessons(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async createLesson(req,res,next){
        let resData = await lessonsService.createLessons(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async deleteLesson(req,res,next){
        let resData = await lessonsService.deleteLesson(req,next)

        if (resData){
            return res.status(resData.status).json(resData)
        }
    }
}

const lessonController = new LessonController()
export default lessonController