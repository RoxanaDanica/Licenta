// db.js
import mysql from 'mysql2/promise';

async function initializeDatabase() {
    const connection = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'paSS123@',
        database: 'orar_efs',
        multipleStatements: true 
    });

    return connection;
}

export default initializeDatabase;
