import Joi from "joi"

export default{
    usersSchema:Joi.object({
        fullname:Joi.string().min(3).max(30).required(),
        phone:Joi.string().pattern(/^\+998(9[0123456789]|33|71|88)[0-9]{7}$/).required(),
        password:Joi.string().min(6).required(),
        role_id:Joi.number().integer().required(),
    }),
    coursesSchema:Joi.object({
        name:Joi.string().min(5).max(34).required(),
        description:Joi.string(),
        level:Joi.string().required(),
        price:Joi.number().positive().required(),
        category_id:Joi.number().required()
    }),

    loginSchema: Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().required()
    }),

    registerSchema: Joi.object({
        fullname: Joi.string().min(3).max(30).required(),
        phone: Joi.string().pattern(/^\+998[0-9]{9}$/).required(),
        password: Joi.string().min(6).required(),
        role_id: Joi.number().integer().required(),
        course_id: Joi.number().integer()
    }),

    roleSchema: Joi.object({
        name: Joi.string().min(3).max(30).required()
    }),

    categorySchema: Joi.object({
        name: Joi.string().min(3).max(50).required()
    }),

    sectionSchema: Joi.object({
        name: Joi.string().required(),
        course_id: Joi.number().integer().required()
    }),

    lessonSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow("")
    }),

    materialSchema: Joi.object({
        description: Joi.string().allow(""),
        lesson_id: Joi.number().integer().required()
    }),

    homeworkSchema: Joi.object({
        description: Joi.string().allow(""),
        lesson_id: Joi.number().integer().required()
    }),

    examSchema: Joi.object({
        lesson_id: Joi.number().integer().required(),
        question: Joi.string().required(),
        variantA: Joi.string().required(),
        variantB: Joi.string().required(),
        variantC: Joi.string().required(),
        variantD: Joi.string().required(),
        answer: Joi.string().required()
    })

}