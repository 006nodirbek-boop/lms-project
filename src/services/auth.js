import pool from "../config/db.js"
import { NotFoundError } from "../utils/error.js"
import argon  from "argon2"

class AuthService{
    
    async login(req,next){
        const { phone, password } = req.body

        let existUser = await pool.query(`select * from users where phone=$1`,[phone])

        if (!existUser.rows.length) {
            next(new NotFoundError(404,"User not found with this phone or password"))
        }

        if (! await argon.verify(existUser.rows[0].password,password)) {
            next(new NotFoundError(404,"User not found with this phone or password"))
        }

        return{
            status:200,
            message:`User login`
        }
    }
}

const authService =new AuthService

export default authService