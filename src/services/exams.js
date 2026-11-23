import pool from "../config/db.js"
import { extname, join } from "path"
import { BadRequestError, ConflictError, ForBiddenError, InternalServerError, NotFoundError } from "../utils/error.js"

class ExamsService{

    async getAllExams(req,next){
        const { lessonId }= req.params
        const teacherId = req.user.id

        const existLesson = await pool.query("select c.user_id from lessons l inner join sections s on l.section_id = s.id inner join courses c on s.course_id=c.id where l.id=$1",[lessonId])
        if (!existLesson.rows.length) {
            next(new NotFoundError(404,"Lesson not found"))
        }

        let lessonTeacherId = existLesson.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != lessonTeacherId) {
            return next(new ForBiddenError(403,"You can not get homework of this lesson"))
        }

        const exams = await pool.query("select * from exams where lesson_id=$1",[lessonId])

        return{
            status:200,
            data:exams.rows
        }

    }


    async createExam(req,next){
        const { lesson_id, question, variantA, variantB, variantC, variantD, answer} = req.body

        const existLesson = await pool.query("select c.user_id from lessons l inner join sections s on l.section_id = s.id inner join courses c on s.course_id=c.id where l.id=$1",[lesson_id])
        if (!existLesson.rows.length) {
           return next(new NotFoundError(404,"Lesson not found"))
        }

        let teacherId = existLesson.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != req.user.id) {
           return next(new ForBiddenError(403,"You can not add homework to this lesson"))
        }

        const existsExam = await pool.query("select * from exams where question=$1 and lesson_id=$2",[question,lesson_id])
        if (existsExam.rows.length) {
            return next(new ConflictError(409,"Question already exists for this exam"))
        }

        await pool.query(`insert into exams(lesson_id, question, variantA, variantB, variantC, variantD, answer) values($1,$2,$3,$4,$5,$6,$7)`,[lesson_id,question, variantA, variantB, variantC, variantD, answer])

        return{
            status:201,
            message:"Exams created!"
        }
    }



    async updateExam(req, next) {
        try {
            const { examId } = req.params

            const {question,variantA,variantB,variantC,variantD,answer} = req.body

            const existExam = await pool.query(`select e.*, c.user_id from exams e inner join lessons l on e.lesson_id = l.id inner join sections s on l.section_id = s.id inner join courses c on s.course_id = c.id where e.id=$1`,[examId])

            if (!existExam.rows.length) {
                return next(
                    new NotFoundError(404, "Exam not found!")
                )
            }

            const oldExam = existExam.rows[0]

            if (req.user.role === "teacher" && req.user.id != oldExam.user_id) {
                return next(
                    new ForBiddenError(403,"You can not update this exam!")
                )
            }

            const newQuestion = question ?? oldExam.question

            const existsQuestion = await pool.query(`select * from exams where question=$1 and lesson_id=$2 and id!=$3`,[newQuestion, oldExam.lesson_id, examId])

            if (existsQuestion.rows.length) {
                return next(
                    new ConflictError(409,"Question already exists for this lesson!")
                )
            }

            await pool.query(`update exams set question=$1, "variantA"=$2, "variantB"=$3, "variantC"=$4, "variantD"=$5, answer=$6 where id=$7`,
            [newQuestion,variantA ?? oldExam.variantA,variantB ?? oldExam.variantB,
            variantC ?? oldExam.variantC,variantD ?? oldExam.variantD,answer ?? oldExam.answer,examId])

            return {
                status: 200,
                message: "Exam updated successfully!"
            }

        } catch (error) {
            return next(
                new InternalServerError(500, error.message)
            )
        }
    }
    
}

const examsService = new ExamsService()
export default examsService