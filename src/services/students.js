import pool from "../config/db.js"
import { ForBiddenError, NotFoundError } from "../utils/error.js"


export class StudentService{

    async getMyCourses(req){
        let studentId = req.user.id 

        let courses = await pool.query(`select c.id,c.name,c.banner,u.photo,u.fullname from payments p join courses c on p.course_id = c.id join users u on c.user_id=u.id where student_id = ${studentId}`)
        
        courses = courses.rows.map(course =>{
            return{
                id: course.id,
                course_name: course.name,
                banner: course.banner,
                teacher: {
                    fullname: course.fullname,
                    photo: course.photo
                }
            }
        })
        return{
            status:200,
            data:courses
        }
        
    }

    async buyCourses(req,next){
        const studentId = req.user.id
        const {courseId} = req.params

        const existCourse = await pool.query("select * from courses where id=$1",[courseId])
        if (!existCourse.rows.length) {
            next(new NotFoundError(404,"Course not found with this id"))
        }

        if (!existCourse.rows[0].aprove) {
            return next(new ForBiddenError(403,"You can't buy this course"))
        }

        await pool.query("insert into payments (student_id,course_id) values($1,$2)",[studentId,courseId])

        return{
            status:201,
            message:"Student buy course"
        }
    }
}


const studentService = new StudentService()
export default studentService