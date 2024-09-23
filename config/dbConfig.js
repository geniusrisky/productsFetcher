
const mysql = require ('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_name,
    port: process.env.DB_port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

if(pool) console.log(`db is connected`)

module.exports = pool