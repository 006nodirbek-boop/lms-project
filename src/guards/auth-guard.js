import { BadRequestError, InternalServerError, UnauthorizedError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export default (req, res, next)=>{
    try {
        const{ token }= req.headers

        if (!token) {
            return next(new UnauthorizedError(401,"Unauthorized user"))
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user

        next()

    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            return next(new BadRequestError(400,"Invalid token"))
        }
        next(new InternalServerError(500,error))
    }
}