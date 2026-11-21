import pool from "../config/db.js"
import { ConflictError, NotFoundError } from "../utils/error.js"
import argon  from "argon2"
import jwt from "jsonwebtoken"

class AuthService{
    
    async login(req,next){
        const { phone, password } = req.body

        let existUser = await pool.query(`select * from users where phone=$1`,[phone])

        existUser = existUser.rows[0]
        if (!existUser) {
            next(new NotFoundError(404,"User not found with this phone or password"))
        }

        if (!await argon.verify(existUser.password,password)) {
            next(new NotFoundError(404,"User not found with this phone or password"))
        }

        const role = await pool.query(`select r.name from users u inner join roles r on u.role_id=r.id where u.role_id=${existUser.role_id}`)
        
        return{
            status:200,
            message:`User login`,
            role:role.rows[0].name,
            accessToken:jwt.sign({id:existUser.id,phone:existUser.phone,role:role.rows[0].name},process.env.JWT_SECRET,{expiresIn:"30m"}),
            refreshToken:jwt.sign({id:existUser.id,phone:existUser.phone,role:role.rows[0].name},process.env.JWT_SECRET,{expiresIn:"24h"})
        }
    }


    async register(req,next){
        const { fullname, phone, password, role_id, course_id } = req.body

        let existStudent = await pool.query("select * from users where phone=$1",[phone])

        if (existStudent.rows.length) {
            return next(new ConflictError(409,"Student already rigester this phone"))
        }

        const existCourse = await pool.query("select * from courses where id=$1",[course_id])
        if (!existCourse.rows.length) {
            next(new NotFoundError(404,"Course not found with this id"))
        }

        if (existCourse.rows[0].aprove) {
            return next(new ForBiddenError(403,"You can't buy this course"))
        }

        const hashPass = await argon.hash(password)

        let student = await pool.query("insert into users(fullname, phone, password, role_id) values($1,$2,$3,$4) returning id",[fullname,phone,hashPass,role_id])

        if (student.rows.length) {
            await pool.query("insert into payments(student_id,course_id) values($1,$2)",[student.rows[0].id,course_id])
        }

        return{
            status:201,
            message:"Student successfully register and buy course",
            role:"student",
            accessToken:jwt.sign({id: student.rows[0].id, phone: phone, role: "student"},process.env.JWT_SECRET,{expiresIn:"30m"}),
            refreshTokenToken:jwt.sign({id: student.rows[0].id, phone: phone, role: "student"},process.env.JWT_SECRET,{expiresIn:"24h"}),

        }
    }
}

const authService =new AuthService()

export default authService