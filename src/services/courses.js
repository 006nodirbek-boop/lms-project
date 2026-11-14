import { log } from "console"
import pool from "../config/db.js"
import {extname, join} from "path"

class CourseService{

    async createCourse(req,next){
        const { name, description, level, price, category_id } = req.body
        const { banner, intro_video } = req.files
        const teacherId = req.user.id 

        const filename_banner = Date.now() + extname(banner.name)      //// avatar.jpg // .jpg
        const filename_video = Date.now() + extname(intro_video.name)

        await pool.query("insert into courses(banner, intro_video, name, description, level, price, category_id, user_id) values($1,$2,$3,$4,$5,$6,$7,$8)",[filename_banner,filename_video,name,description,level,price,category_id])

        banner.mv(join(process.cwd(),"src","uploads",filename_banner),err =>{
            if (err) {
                console.log(err);
            }
        })
        intro_video.mv(join(process.cwd(),"src","uploads",filename_video),err =>{
            if (err) {
                console.log(err);
            }
        })
        return{
            status:201,
            message:"Course added!"
        }
    }
}

const courseService = new CourseService()

export default courseService