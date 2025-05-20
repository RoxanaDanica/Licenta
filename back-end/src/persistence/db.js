// db.js
import mysql from 'mysql2/promise';

let connection = null;

export async function initializeDatabase() {
    connection = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'paSS123@',
        database: 'orar_efs',
        multipleStatements: true 
    });
}

export const retrieveConnection = () => {
    if (connection) {
        return connection;
    }

    throw new Error("No database connected!");
}

