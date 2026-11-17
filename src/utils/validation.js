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
    })
}