import pool from "../config/db.js"
import {extname, join} from "path"
import { NotFoundError } from "../utils/error.js"

class CourseService{

    async getMyCourses(req,next){
        const teacherId = req.user.id

        const courses = await pool.query(`select * from courses where user_id=${teacherId}`)

        return{
            status:200,
            data:courses.rows
        }
    }

    async getAllCourses(){
        const courses = await pool.query("select * from courses")

        return{
            status:200,
            data:courses.rows
        }
    }

    async getCourses(){
        const courses = await pool.query("select * from courses where aprove=true")

        return{
            status:200,
            data:courses.rows
        }
    }

    async createCourse(req,next){
        const { name, description, level, price, category_id } = req.body
        const { banner, intro_video } = req.files
        const teacherId = req.user.id 

        const existCategory = await pool.query("select * from categories where id=$1",[category_id])
        if (!existCategory.rows.length) {
            next(new NotFoundError(404,"Category not found with this id"))
        }

        const filename_banner = Date.now() + extname(banner.name)      //// avatar.jpg // .jpg
        const filename_video = Date.now() + extname(intro_video.name)

        await pool.query("insert into courses(banner, intro_video, name, description, level, price, category_id, user_id) values($1,$2,$3,$4,$5,$6,$7,$8)",[filename_banner,filename_video,name,description,level,price,category_id,teacherId])

        banner.mv(join(process.cwd(),"src","uploads",filename_banner),err =>{
            if (err) {
                console.log(err);
            }
        })
        intro_video.mv(join(process.cwd(),"src","uploads",filename_video),err =>{
            if (err) {
                console.log(err);
            }
        })
        return{
            status:201,
            message:"Course added!"
        }
    }

    async aproveCourse(req,next){
        const { courseId } = req.params

        const existCourse = await pool.query("select * from courses where id=$1",[courseId])
        if (!existCourse.rows.length) {
            next(new NotFoundError(404,"Course not found"))
        }

        await pool.query(`update courses set aprove=${existCourse.rows[0].aprove ? false : true} where id=$1`,[courseId])

        return{
            status:200,
            message:"Course aproved!"
        }
    }

    async updateCourse(req, next) {
        try {
            const { courseId } = req.params;
            const { name, description, level, price, category_id } = req.body;

            const teacherId = req.user.id;

            const existCourse = await pool.query("SELECT * FROM courses WHERE id=$1",[courseId]);

            if (!existCourse.rows.length) {
                return next(new NotFoundError(404, "Course not found!"));
            }

            if (req.user.role !== "admin" && existCourse.rows[0].user_id != teacherId) {
                return next(new Error("You are not allowed to update this course"));
            }

            const existCategory = await pool.query("SELECT * FROM categories WHERE id=$1",[category_id]);

            if (!existCategory.rows.length) {
                return next(new NotFoundError(404, "Category not found!"));
            }

            await pool.query(`UPDATE courses SET name=$1,description=$2,level=$3,price=$4,category_id=$5 WHERE id=$6`,[name, description, level, price, category_id, courseId]);

            return {
                status: 200,
                message: "Course updated successfully!"
            };

        } catch (error) {
            return next(error);
        }
    }

    async deleteCourse(req, next) {
        try {
            const { courseId } = req.params;
            const userId = req.user.id;

            const existCourse = await pool.query("SELECT * FROM courses WHERE id=$1",[courseId]);

            if (!existCourse.rows.length) {
                return next(new NotFoundError(404, "Course not found"));
            }

            if (req.user.role !== "admin" && existCourse.rows[0].user_id != userId) {
                return next(new NotFoundError(403, "You cannot delete this course"));
            }

            await pool.query("DELETE FROM courses WHERE id=$1",[courseId]);

            return {
                status: 200,
                message: "Course deleted successfully!"
            };

        } catch (error) {
            return next(error);
        }
    }

}

const courseService = new CourseService()

export default courseService