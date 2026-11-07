import Joi from "joi"

export default{
    usersSchema:Joi.object({
        fullname:Joi.string().min(3).max(30).required(),
        phone:Joi.string().pattern(/^\+998(9[0123456789]|33|71|88)[0-9]{7}$/).required(),
        password:Joi.string().min(6).required(),
        role_id:Joi.number().integer().required(),
    })
}