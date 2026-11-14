import pool from "../config/db.js";

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
}

const teacherService = new TeacherService()

export default teacherService