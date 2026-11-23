import pool from "../config/db.js"
import { extname, join } from "path"
import { BadRequestError, ConflictError, ForBiddenError, InternalServerError, NotFoundError } from "../utils/error.js"

class LessonsService{

    async getAllLessons(req,res){
        const { sectionId }= req.params
        const teacherId = req.user.id

        const existSection = await pool.query("select c.user_id from sections s inner join courses c on s.course_id = c.id where s.id=$1",[sectionId])
        if (!existSection.rows.length) {
            next(new NotFoundError(404,"Section not found"))
        }

        let sectionTeacherId = existSection.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != sectionTeacherId) {
            return next(new ForBiddenError(403,"You can not get lessons of this section"))
        }

        const lessons = await pool.query("select * from lessons where section_id=$1",[sectionId])

        return{
            status:200,
            data:lessons.rows
        }


    }


    async createLessons(req,next){
        const { name, description, section_id } = req.body
        const { file } = req.files

        const filename = Date.now() + extname(file.name)

        const existSection = await pool.query("select c.user_id from sections s inner join courses c on s.course_id = c.id where s.id=$1",[section_id])
        if (!existSection.rows.length) {
            next(new NotFoundError(404,"Section not found"))
        }

        let teacherId = existSection.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != req.user.id) {
            return next(new ForBiddenError(403,"You can not add lesson to this section"))
        }

        const existsLesson = await pool.query("select * from lessons where name=$1 and section_id=$2",[name,section_id])
        if (existsLesson.rows.length) {
            next(new ConflictError(409,"Lesson name already exist with this section"))
        }


        const allowedFileTypes = [".mp4",".mov",".avi",".wmv",".flv",".mkv",".pdf",".png"]

        if (!allowedFileTypes.includes(extname(file.name))) {
            return next(new BadRequestError(400, "Invalid file type"))
        }

        await pool.query(`insert into lessons(name, description, section_id,file) values($1,$2,$3,$4)`,[name, description, section_id,filename])

        file.mv(join(process.cwd(),"src","uploads",filename),err =>{
            if(err){
                console.log(err)
            }
        })


        return{
            status:201,
            message:"Lesson created!"
        }
    }

    async deleteLesson(req, next) {
        try {
            const { lessonId } = req.params

            const existLesson = await pool.query(`select l.*, c.user_id from lessons l inner join sections s on l.section_id = s.id inner join courses c on s.course_id = c.id where l.id=$1`,[lessonId])

            if (!existLesson.rows.length) {
                return next(new NotFoundError(404, "Lesson not found!"))
            }

            if (req.user.role === "teacher" && req.user.id != existLesson.rows[0].user_id) {
                return next(new ForBiddenError(403, "You can not delete this lesson!"))
            }

            await pool.query("delete from lessons where id=$1",[lessonId])

            return {
                status: 200,
                message: "Lesson deleted successfully!"
            }

        } catch (error) {
            return next(new InternalServerError(500, error.message))
        }
    }


}

const lessonsService = new LessonsService()
export default lessonsService