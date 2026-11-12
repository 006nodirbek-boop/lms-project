import pool from "../config/db.js"
import { NotFoundError } from "../utils/error.js"
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
}

const authService =new AuthService()

export default authService