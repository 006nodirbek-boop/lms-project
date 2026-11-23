import pool from "../config/db.js"
import { ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"

class RoleService {

    async getRoles(){
        let roles = await pool.query("select * from roles")

        return{
            status:200,
            data:roles.rows
        }
    }

    async createRole(req,next){
        try {
            const { name } = req.body

            const existRole = await pool.query("select * from roles where name=$1",[name])
            if (existRole.rows.length) {
                return next(new ConflictError(409,"Role already exist"))
            }

            await pool.query(`insert into roles (name) values($1)`,[name])

            return{
                status:201,
                message:"Role created!"
            }
        } catch (error) {
            next(new InternalServerError(500,error))
        }
    }

    async deleteRole(req,next){
        try {
            const { roleId } = req.params

            const existRole = await pool.query("select * from roles where id=$1",[roleId])

            if (!existRole.rows.length) {
                return next(new NotFoundError(404,"Role not found with this id"))
            }

            const existUser = await pool.query("select * from users where role_id=$1",[roleId])

            if (existUser.rows.length) {
                return next(new ConflictError(409,"This role is assigned to users and cannot be deleted!"))
            }

            if (existRole.rows[0].name === "admin") {
                return next(new ConflictError(409,"Admin role cannot be deleted!"))
            }

            await pool.query("delete from roles where id=$1",[roleId])

            return {
                status:200,
                message:"Role deleted successfully!"
            }

        } catch (error) {
            return next(new InternalServerError(500,error.message))
        }
    }
}

const roleService = new RoleService()
export default roleService