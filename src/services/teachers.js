import pool from "../config/db.js";
import { ConflictError, InternalServerError, NotFoundError } from "../utils/error.js";

class TeacherService{

    async getAllTeacher(){
        let role = await pool.query("select * from roles where name='teacher'")
        let role_id = role.rows[0].id
        let teachers = await pool.query(`select * from users where role_id=${role_id}`)

        return{
            status:200,
            data:teachers.rows
        }
    }


    async updateTeacher(req, next) {
        try {
            const { teacherId } = req.params;
            const {fullname, phone, password,experience, job, portfolio, description,github, instagram, facebook, telegram, linkedin} = req.body;

            const teacher = await pool.query(`SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1 AND r.name = 'teacher'`,[teacherId]);

            if (!teacher.rows.length) {
                return next(new NotFoundError(404, "Teacher not found!"));
            }

            if (phone) {
                const checkPhone = await pool.query("SELECT id FROM users WHERE phone = $1 AND id != $2",[phone, teacherId]);

                if (checkPhone.rows.length) {
                    return next(new ConflictError(409, "Phone already exists!"));
                }
            }

            const hashedPassword = password ? await argon.hash(password) : teacher.rows[0].password;

            await pool.query(`UPDATE users SET fullname = COALESCE($1, fullname),phone = COALESCE($2, phone),password = $3 WHERE id = $4`,[fullname, phone, hashedPassword, teacherId]);

            await pool.query(
                `UPDATE mentor_profile SET
                experience = COALESCE($1, experience),
                job = COALESCE($2, job),
                portfolio = COALESCE($3, portfolio),
                description = COALESCE($4, description),
                github = COALESCE($5, github),
                instagram = COALESCE($6, instagram),
                facebook = COALESCE($7, facebook),
                telegram = COALESCE($8, telegram),
                linkedin = COALESCE($9, linkedin)
                    WHERE user_id = $10`,
                [
                    experience, job, portfolio, description,
                    github, instagram, facebook, telegram, linkedin,
                    teacherId
                ]
            );

            return {
                status: 200,
                message: "Teacher updated successfully!"
            };

        } catch (error) {
            return next(new InternalServerError(500, error.message));
        }
    }


    async deleteTeacher(req, next) {
        try {
            const { teacherId } = req.params

            const existTeacher = await pool.query(`SELECT u.* FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1 AND r.name = 'teacher'`,[teacherId])

            if (!existTeacher.rows.length) {
                return next(
                    new NotFoundError(404, "Teacher not found!")
                )
            }

            const existCourses = await pool.query("SELECT * FROM courses WHERE user_id=$1",[teacherId])

            if (existCourses.rows.length) {
                return next(
                    new ConflictError(409, "First delete all courses of this teacher!")
                )
            }

            await pool.query("DELETE FROM mentor_profile WHERE user_id=$1",[teacherId])

            await pool.query("DELETE FROM users WHERE id=$1",[teacherId])

            return {
                status: 200,
                message: "Teacher deleted successfully!"
            }

        } catch (error) {
            return next(
                new InternalServerError(500, error.message)
            )
        }
    }
}

const teacherService = new TeacherService()

export default teacherService