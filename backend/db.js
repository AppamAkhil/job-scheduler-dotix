import mysql from "mysql2/promise";

export const db = await mysql.createPool(process.env.DATABASE_URL);
