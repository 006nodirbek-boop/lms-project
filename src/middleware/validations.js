import schema from "../utils/validation.js"

export default{
    createUsers:(req,res,next)=>{
        let { error } = schema.usersSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                status:400,
                message:error.message
            })
        }
        return next()
    }
}