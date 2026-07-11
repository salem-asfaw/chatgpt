import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";


const caCertPath = path.join(process.cwd(), process.env.DB_CA_PATH || "isrgrootx1.pem");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || process.env.DB_DATABASE, 
  ssl: {
    ca: fs.readFileSync(caCertPath),
  },
});

export default pool;