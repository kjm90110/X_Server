import mysql from "mysql2";
import { config } from "../config.mjs";

// db와 connection 해놓는 객체(connection pool 등록)
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
});

export const db = pool.promise(); // 비동기로 return 하도록 promise로 내보냄
