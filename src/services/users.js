import pool from "../config/db.js"
import argon from "argon2"
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"

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

    async updateUser(req, next) {
        try {
            const { userId } = req.params;
            const { fullname, phone, password, role_id } = req.body;

            if (!fullname || !phone || !role_id) {
                return next(
                    new BadRequestError(400, "All required fields must be provided")
                );
            }

            const existUser = await pool.query("SELECT * FROM users WHERE id=$1",[userId]);

            if (!existUser.rows.length) {
                return next(
                    new NotFoundError(404, "User not found with this id")
                );
            }

            const duplicatePhone = await pool.query("SELECT * FROM users WHERE phone=$1 AND id!=$2",[phone, userId]);

            if (duplicatePhone.rows.length) {
                return next(
                    new ConflictError(409, "Phone number already exists")
                );
            }

            const existRole = await pool.query("SELECT * FROM roles WHERE id=$1",[role_id]);

            if (!existRole.rows.length) {
                return next(
                    new NotFoundError(404, "Role not found with this id")
                );
            }

            if (password) {
                const hashPassword = await argon.hash(password);
    
                await pool.query(`UPDATE users SET fullname=$1, phone=$2, password=$3, role_id=$4 WHERE id=$5`,[fullname, phone, hashPassword, role_id, userId]);
            } else {
                await pool.query(`UPDATE users SET fullname=$1, phone=$2, role_id=$3 WHERE id=$4`,[fullname, phone, role_id, userId]);
            }

            return {
                status: 200,
                message: "User updated successfully!"
            };

        } catch (error) {
            return next(new InternalServerError(500, error.message));
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