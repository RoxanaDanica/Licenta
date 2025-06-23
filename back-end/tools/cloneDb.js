// tools/cloneDb.js
import mysql from 'mysql2/promise';

async function cloneDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paSS123@',
    multipleStatements: true
  });

  console.log('🔄 Clonare bază de date...');

  await connection.query(`DROP DATABASE IF EXISTS orar_efs_test`);
  await connection.query(`CREATE DATABASE orar_efs_test`);

  const source = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paSS123@',
    database: 'orar_efs'
  });

  const target = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'paSS123@',
    database: 'orar_efs_test'
  });

  const [tables] = await source.query(`SHOW TABLES`);
  const tableKey = Object.keys(tables[0])[0];

  const orderedTableNames = ['materii', 'profesori', 'studenti', 'orar', 'studenti_inscrisi', 'prezente'];
  

  for (const table of orderedTableNames) {
    const [[{ 'Create Table': createTableSql }]] = await source.query(`SHOW CREATE TABLE \`${table}\``);
    await target.query(createTableSql);
  
    const [rows] = await source.query(`SELECT * FROM \`${table}\``);
    if (rows.length > 0) {
      const cols = Object.keys(rows[0]);
      const values = rows.map(row => cols.map(col => row[col]));
      const placeholders = values.map(() => `(${cols.map(() => '?').join(',')})`).join(',');
      const flatValues = values.flat();
      await target.query(
        `INSERT INTO \`${table}\` (${cols.join(',')}) VALUES ${placeholders}`,
        flatValues
      );
    }
  
    console.log(`✅ Tabel clonat: ${table}`);
  }
  

  console.log('✅ Baza de date orar_efs_test a fost clonată cu succes.');
  await connection.end();
  await source.end();
  await target.end();
}

cloneDatabase().catch(console.error);
