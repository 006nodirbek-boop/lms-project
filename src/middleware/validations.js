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
    },
    
         
    login: (req, res, next) => {
    const { error } = schema.loginSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    register: (req, res, next) => {
    const { error } = schema.registerSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createRole: (req, res, next) => {
    const { error } = schema.roleSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createCategory: (req, res, next) => {
    const { error } = schema.categorySchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createSection: (req, res, next) => {
    const { error } = schema.sectionSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createLesson: (req, res, next) => {
    const { error } = schema.lessonSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createMaterial: (req, res, next) => {
    const { error } = schema.materialSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createHomework: (req, res, next) => {
    const { error } = schema.homeworkSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    },

    createExam: (req, res, next) => {
    const { error } = schema.examSchema.validate(req.body);

    if (error) {
        return next(new BadRequestError(400, error.message));
    }

    next();
    }


}