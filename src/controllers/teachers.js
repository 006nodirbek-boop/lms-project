import teacherService from "../services/teachers.js"

class TeacherController{

    async getAllTeachers(req,res){
        let resData =await teacherService.getAllTeacher()

        if (resData) {
            return res.status(resData.status).json(resData)
        }
    }
}

const teacherController = new TeacherController

export default teacherController