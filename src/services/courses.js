class CourseService{

    async createCourse(req,next){
        const { name, description, level, price, category_id } = req.body
        const { banner, intro_video } = req.files
    }
}

const courseService = new CourseService()

export default courseService