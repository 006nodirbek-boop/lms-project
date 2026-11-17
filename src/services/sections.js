import pool from "../config/db.js"
import { ForBiddenError, NotFoundError } from "../utils/error.js"

class SectionService{
    async createSection(req,next){
        const{ name, course_id } = req.body
        const teacherId = req.user.id

        const existCourse = await pool.query("select * from courses where id=$1",[course_id])
        if (!existCourse.rows.length) {
            next(new NotFoundError(404,"Course not found"))
        }

        if (teacherId != existCourse.rows[0].course_id) {
            next(new ForBiddenError(403,"You can not add section to this course"))
        }

        const existSection = await pool.query("select * from sections where name=$1",[name])
        if (existSection.rows.length) {
            next(new NotFoundError(409,"Section already exist"))
        }

        

        await pool.query("insert into sections(name,course_id) values($1,$2)",[name,course_id])

        return{
            status:201,
            message:"create section"
        }

    }
}

const sectionService = new SectionService()

export default sectionService