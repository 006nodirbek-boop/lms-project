import { configDotenv } from "dotenv";
import { Pool } from "pg";
configDotenv()

const pool = new Pool({
    port:process.env.PG_PORT,
    host:process.env.PG_HOST,
    user:process.env.PG_USER,
    password:process.env.PG_PASSWORD,
    database:process.env.PG_DATABASE

})

export default pool
