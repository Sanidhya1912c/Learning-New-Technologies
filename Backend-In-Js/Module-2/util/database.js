const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'sk20',
    database: 'mydatabase', 
    password: 'Shiva1821j@'
})


module.exports = pool.promise();