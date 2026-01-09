import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "job_scheduler",
  port: 3306
});
