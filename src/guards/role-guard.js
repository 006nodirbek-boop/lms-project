import { ForBiddenError, InternalServerError } from "../utils/error.js"

export const roleGuard = (...roles)=>{
    return(req,res,next)=>{
        try {
            if (!roles.includes(req.user.role)) {
                return next(new ForBiddenError(403,"Forbidden"))
            }
            return next()
        } catch (error) {
            return next(new InternalServerError(500,error))
        }
    }
}