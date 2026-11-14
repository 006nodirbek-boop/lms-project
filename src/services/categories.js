import pool from "../config/db.js"
import { ConflictError } from "../utils/error.js"

class CategoriesService{

    async getAllCategories(){
        const categories = await pool.query("select * from categories where status='active'")

        return{
            status:200,
            data:categories.rows
        }
    }

    async createCategory(req,next){
        const { name } = req.body

        const existCategory = await pool.query("select * from categories where name=$1",[name])

        if (existCategory.rows.length) {
            return next(new ConflictError("Category name already exist"))
        }

        await pool.query("insert into categories(name)values($1)",[name])

        return{
            status:201,
            message:"Category added!"
        }
    }
}

const categoriesService = new CategoriesService()

export default categoriesService