import courseService from "../services/courses.js";

class CourseController{

    async getCourses(req,res){
        let resData = await courseService.getCourses()
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async getMyCourses(req,res,next){
        let resData = await courseService.getMyCourses(req,res)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async getAllCourses(req,res){
        let resData = await courseService.getAllCourses()
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }


    async createCourse(req,res,next){
        let resData = await courseService.createCourse(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async aproveCourse(req,res,next){
        let resData = await courseService.aproveCourse(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const courseController = new CourseController

export default courseController