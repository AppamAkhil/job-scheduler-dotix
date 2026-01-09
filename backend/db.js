import mysql from "mysql2/promise";

export const db = await mysql.createPool({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.admin,
  database: process.env.job_scheduler,
  port: process.env.DB_PORT || 3306
});
