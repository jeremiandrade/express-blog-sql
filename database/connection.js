const mysql = require('mysql2')

const credentials = {
    host: process.env = DB_HOST,
    user: process.env = DB_USER,
    password: process.env = DB_PASSWORD,
    name: process.env = DB_NAME
}


//create connection
const connection = mysql.createConnection(credentials)

//connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
        return

    }
    console.log('Connected to the database.');
})
module.exports = connection