// db.js
import mysql from 'mysql2/promise';

let connection = null;

export async function initializeDatabase() {
    const dbName = process.env.NODE_ENV === 'test' ? 'orar_efs_test' : 'orar_efs';

    connection = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'paSS123@',
        database : dbName,
        multipleStatements: true 
    });
}

export const retrieveConnection = () => {
    if (connection) {
        return connection;
    }

    throw new Error("No database connected!");
}

