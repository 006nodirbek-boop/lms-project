import examsService from "../services/exams.js";

class ExamController{

    async getAllExams(req,res,next){
        let resData = await examsService.getAllExams(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async createExam(req,res,next){
        let resData = await examsService.createExam(req,next)
        if (resData){
            return res.status(resData.status).json(resData)
        }
    }

    async updateExam(req, res, next) {
        let resData = await examsService.updateExam(req, next)

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async deleteExam(req,res,next){
        let resData = await examsService.deleteExam(req,next)

        if (resData){
            return res.status(resData.status).json(resData)
        }
    }
}

const examController = new ExamController()
export default examController