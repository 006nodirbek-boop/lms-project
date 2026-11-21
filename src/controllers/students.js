import studentService from "../services/students.js";

class StudentController{

    async getMyCourses(req,res,next){
        let resData = await studentService.getMyCourses(req)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }

    async buyCourses(req,res,next){
        let resData = await studentService.buyCourses(req,next)
        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const studentController = new StudentController()
export default studentController