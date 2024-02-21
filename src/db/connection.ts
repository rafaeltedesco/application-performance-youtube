import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT) ?? 3306,
  database: process.env.DB_NAME ?? 'yt_proxy',
})

export default connection;