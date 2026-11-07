import pool from "../config/db.js"

class RoleService {

    async getRoles(){
        let roles = await pool.query("select * from roles")

        return{
            status:200,
            data:roles.rows
        }
    }

    async createRole(req){
        const { name } = req.body

        const existRole = await pool.query("select * from roles where name=$1",[name])
        if (existRole.rows.length) {
            return{
                status:409,
                message:"Role already exist"
            }
        }

        await pool.query(`insert into roles (name) values($1)`,[name])

        return{
            status:201,
            message:"Role created!"
        }
    }
}

const roleService = new RoleService()
export default roleService