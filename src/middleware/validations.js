import { BadRequestError, InternalServerError } from "../utils/error.js"
import schema from "../utils/validation.js"

export default{
    createUsers:(req,res,next)=>{
        try {
            let { error } = schema.usersSchema.validate(req.body)
            if (error) {
                return next(new BadRequestError(400,error.message))
            }

            return next()
        } catch (error) {
            next(new InternalServerError(500,error))
        }
    },


    createCourse:(req,res,next)=>{
        try {
            let { error } = schema.coursesSchema.validate(req.body)
            if (error) {
                return next(new BadRequestError(400,error.message))
            }

            return next()
        } catch (error) {
            next(new InternalServerError(500,error))
        }
    }
}