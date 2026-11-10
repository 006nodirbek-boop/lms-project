import pool from "../config/db.js"
import argon from "argon2"
import { InternalServerError } from "../utils/error.js"

class UserServices{

    async getAdmins(){
        const role = await pool.query("select * from users where role_id = (select id from roles where name ='admin')")

        return{
            status:200,
            data:role.rows
        }
    }

    async createAdmin(req){
        const{ fullname,phone,password,role_id } = req.body

        const existUser = await pool.query("select * from users where phone=$1",[phone])
        if (existUser.rows.length) {
            return{
                status:409,
                message:"User already exist"
            }
        }

        const existRole = await pool.query("select * from roles where id=$1",[role_id])
        if (!existRole.rows.length) {
            return{
                status:404,
                message:"Role not found with this id"
            }
        }

        const hashPassword = await argon.hash(password)

        await pool.query(`insert into users(fullname,phone,password,role_id) values($1,$2,$3,$4)`,[fullname,phone,hashPassword,role_id])

        return{
            status:201,
            message:"User created!"
        }
    }

    async createTeacher(req,next){
        
        try {

            const {
                fullname,phone,password,role_id,experience,job,portfolio,description,github,instagram,facebook,telegram,linkedin
            } = req.body;

            const hashPassword = await argon.hash(password)
            const teacher = await pool.query("insert into users(fullname,phone,password,role_id) values ($1,$2,$3,$4) RETURNING * ",[fullname,phone,hashPassword,role_id])
            await pool.query(
                `INSERT INTO mentor_profile (
                    user_id,
                    experience, 
                    job, 
                    portfolio, 
                    description,
                    github, 
                    instagram, 
                    facebook, 
                    telegram, 
                    linkedin
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [
                    teacher.rows[0].id,
                    experience ?? null,
                    job ?? null,
                    portfolio ?? null,
                    description ?? null,
                    github ?? null,
                    instagram ?? null,
                    facebook ?? null,
                    telegram ?? null,
                    linkedin ?? null
                ]
            );

            return{
            status:201,
            message:"Teacher created!"
            }  

        } catch (error) {
            next(new InternalServerError(500,error))
        }
    }

    async deleteUser(req, next){
        try {
            const { userId } = req.params

            const existUser = await pool.query("select * from users where id=$1",[userId])

            if (!existUser.rows.length) {
                next(new NotFoundError(404,"User not found with this id"))
            }

            await pool.query("delete from users where id=$1",[userId])

            return{
                status:200,
                message:"User deleted"
            }
        } catch (error) {
            next(new InternalServerError(500,error))
        }
    }
}

const userService = new UserServices

export default userService