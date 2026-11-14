import courseService from "../services/courses.js";

class CourseController{

    async createCourse(req,res,next){
        let resData = await courseService.createCourse(req.next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const courseController = new CourseController

export default courseController