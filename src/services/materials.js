import pool from "../config/db.js"
import { extname, join } from "path"
import { BadRequestError, ConflictError, ForBiddenError, InternalServerError, NotFoundError } from "../utils/error.js"

class MaterialsService{

    async getAllMaterials(req,next){
        const { lessonId }= req.params
        const teacherId = req.user.id

        const existLesson = await pool.query("select c.user_id from lessons l inner join sections s on l.section_id = s.id inner join courses c on s.course_id=c.id where l.id=$1",[lessonId])
        if (!existLesson.rows.length) {
            next(new NotFoundError(404,"Lesson not found"))
        }

        let lessonTeacherId = existLesson.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != lessonTeacherId) {
            return next(new ForBiddenError(403,"You can not get materials of this lesson"))
        }

        const materials = await pool.query("select * from materials where lesson_id=$1",[lessonId])

        return{
            status:200,
            data:materials.rows
        }


    }


    async createMaterial(req,next){
        const { description, lesson_id } = req.body
        const { file } = req.files

        const filename = Date.now() + extname(file.name)

        const existLesson = await pool.query("select c.user_id from lessons l inner join sections s on l.section_id = s.id inner join courses c on s.course_id=c.id where l.id=$1",[lesson_id])
        if (!existLesson.rows.length) {
            next(new NotFoundError(404,"Lesson not found"))
        }

        let teacherId = existLesson.rows[0].user_id

        if (req.user.role == "teacher" && teacherId != req.user.id) {
            return next(new ForBiddenError(403,"You can not add material to this lesson"))
        }

        const existsMaterial = await pool.query("select * from materials where lesson_id=$1",[lesson_id])
        if (existsMaterial.rows.length) {
            next(new ConflictError(409,"Material already exists for this lesson"))
        }

        const allowedFileTypes = [".pdf",".doc",".docx",".ppt",".pptx",".jpg",".png",".jpeg"]

        if (!allowedFileTypes.includes(extname(file.name))) {
            return next(new BadRequestError(400, "Invalid file type"))
        }

        await pool.query(`insert into materials(description, lesson_id,file) values($1,$2,$3)`,[ description,lesson_id,filename])

        file.mv(join(process.cwd(),"src","uploads",filename),err =>{
            if(err){
                console.log(err)
            }
        })


        return{
            status:201,
            message:"Material created!"
        }
    }

    
    async deleteMaterial(req, next) {
        try {
            const { materialId } = req.params

            const existMaterial = await pool.query(`select m.*, c.user_id from materials m inner join lessons l on m.lesson_id = l.id inner join sections s on l.section_id = s.id inner join courses c on s.course_id = c.id where m.id=$1`,[materialId])

            if (!existMaterial.rows.length) {
                return next(
                    new NotFoundError(404, "Material not found!")
                )
            }

            if (req.user.role === "teacher" && req.user.id != existMaterial.rows[0].user_id) {
                return next(
                    new ForBiddenError(403, "You can not delete this material!")
                )
            }

            await pool.query("delete from materials where id=$1",[materialId])

            return {
                status: 200,
                message: "Material deleted successfully!"
            }

        } catch (error) {
            return next(
                new InternalServerError(500, error.message)
            )
        }
    }


    async updateMaterial(req, next) {
        try {
            const { materialId } = req.params
            const { description } = req.body

            const existMaterial = await pool.query(`select m.*, c.user_id from materials m inner join lessons l on m.lesson_id = l.id inner join sections s on l.section_id = s.id inner join courses c on s.course_id = c.id where m.id=$1`,[materialId])

            if (!existMaterial.rows.length) {
                return next(
                    new NotFoundError(404, "Material not found!")
                )
            }

            if (req.user.role === "teacher" && req.user.id != existMaterial.rows[0].user_id) {
                return next(
                    new ForBiddenError(403, "You can not update this material!")
                )
            }

            const allowedFileTypes = [".pdf", ".doc", ".docx",".ppt", ".pptx", ".jpg",".png", ".jpeg"]

            let filename = existMaterial.rows[0].file

            const file = req.files?.file

            if (file) {
                if (!allowedFileTypes.includes(extname(file.name).toLowerCase())) {
                    return next(
                        new BadRequestError(400, "Invalid file type")
                    )
                }

                filename = Date.now() + extname(file.name)

                await file.mv(join(process.cwd(), "src", "uploads", filename))
            }

            await pool.query(`update materials set description=$1, file=$2 where id=$3`,[description ?? existMaterial.rows[0].description,filename,materialId])

            return {
                status: 200,
                message: "Material updated successfully!"
            }

        } catch (error) {
            return next(
                new InternalServerError(500, error.message)
            )
        }
    }


}

const materialsService = new MaterialsService()
export default materialsService