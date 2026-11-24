import pool from "../config/db.js"
import { ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"

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

    async updateCategory(req,next){
        try {
            const { categoryId } = req.params
            const { name } = req.body

            const existCategory = await pool.query("select * from categories where id=$1 and status='active'",[categoryId])

            if (!existCategory.rows.length) {
                return next(new NotFoundError(404,"Category not found!"))
            }

            const duplicateCategory = await pool.query("select * from categories where name=$1 and id!=$2 and status='active'",[name,categoryId])

            if (duplicateCategory.rows.length) {
                return next(new ConflictError(409,"Category name already exist!"))
            }

            await pool.query("update categories set name=$1 where id=$2",[name,categoryId])

            return {
                status:200,
                message:"Category updated successfully!"
            }

        } catch (error) {
            return next(new InternalServerError(500,error.message))
        }
    }

    async deleteCategory(req,next){
        try {
            const { categoryId } = req.params

            const existCategory = await pool.query("select * from categories where id=$1 and status='active'",[categoryId])

            if (!existCategory.rows.length) {
                return next(new NotFoundError(404,"Bunday category mavjud emas!"))
            }

            await pool.query("update categories set status='deleted' where id=$1",[categoryId])

            return {
                status: 200,
                message: "Category deleted successfully!"
            }

        } catch (error) {
            return next(new InternalServerError(500,error.message))
        }
    }

}


const categoriesService = new CategoriesService()

export default categoriesService