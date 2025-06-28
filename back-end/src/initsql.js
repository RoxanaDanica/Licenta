const createSQL = `
    CREATE DATABASE IF NOT EXISTS orar_efs;
    USE orar_efs;

    CREATE TABLE IF NOT EXISTS materii (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nume_materie VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profesori (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nume_profesor VARCHAR(100) NOT NULL,
        id_materie INT,
        FOREIGN KEY (id_materie) REFERENCES materii(id) ON DELETE SET NULL
    );

    const createTableQuery = async () => {
    const connection = retrieveConnection();
    await connection.execute(
        CREATE TABLE IF NOT EXISTS prezente (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_student INT,
        id_slot INT,
        data_prezentei DATE,
        FOREIGN KEY (id_student) REFERENCES studenti(id),
        FOREIGN KEY (id_slot) REFERENCES orar(id)
        );
    );
    console.log('Tabela "prezente" a fost creată cu succes.');
    };

       const alterPrezenteTable = async () => {
        const connection = await retrieveConnection();
        try {
          await connection.execute(ALTER TABLE prezente ADD COLUMN prezent BOOLEAN DEFAULT FALSE);
          console.log('Coloana "prezent" a fost adăugată.');
        } catch (err) {
          if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Coloana "prezent" există deja.');
          } else {
            throw err;
          }
        } 
      };
      

    alterPrezenteTable();
      
    await createTableQuery();
      

    CREATE TABLE IF NOT EXISTS orar (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ziua VARCHAR(20) NOT NULL,
        baza VARCHAR(50) NOT NULL,
        locul VARCHAR(50) NOT NULL,
        ora TIME NOT NULL,
        participanti VARCHAR(255) NOT NULL,
        activitate VARCHAR(100) NOT NULL,
        nr_max_locuri INT DEFAULT 50
    );

        
    CREATE TABLE IF NOT EXISTS studenti (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS studenti_inscrisi (
    id_student INT NOT NULL,
    id_slot INT NOT NULL
);
        
`;
// const createProfesoriMateriiTable = async () => {
//   await retrieveConnection().execute(`
//       CREATE TABLE IF NOT EXISTS profesori_materii (
//           id_profesor INT NOT NULL,
//           id_materie INT NOT NULL,
//           FOREIGN KEY (id_profesor) REFERENCES profesori(id) ON DELETE CASCADE,
//           FOREIGN KEY (id_materie) REFERENCES materii(id) ON DELETE CASCADE,
//           PRIMARY KEY (id_profesor, id_materie)
//       )
//   `);
//   console.log('Tabela profesori_materii a fost creată sau există deja.');
// };

// createProfesoriMateriiTable();
    
`;
/*===============================================================================
=============================TABELA STUDENTI=====================================
================================================================================= */
  const studenti = [
          { username: 'student1', password: 'student' },
          { username: 'student2', password: 'student' },
          { username: 'student3', password: 'student' },
          { username: 'student4', password: 'student' },
          { username: 'student5', password: 'student' },
          { username: 'student6', password: 'student' },
          { username: 'student7', password: 'student' },
          { username: 'student8', password: 'student' },
          { username: 'student9', password: 'student' },
          { username: 'student10', password: 'student' }
        ];
/*===============================================================================
=============================TABELA MATERII======================================
================================================================================= */
await connection.query(createSQL);
console.log('Baza de date și tabelele au fost create/validate.');

// Materiile
const materii = ['Jogging','Baschet 3X3','Fotbal','Culturism','Aerobic','Cerc volei','Fotbal feminin','Fitness',"Înot "];

// Inserează materiile (evităm duplicatele)
const insertSQL = `
INSERT INTO materii (nume_materie)
VALUES ?;
`;
// datele pentru inserare
//   const values = materii.map(materie => [materie]);
//   await connection.query(insertSQL, [values]);
//   console.log('Materiile au fost inserate.');
/*===============================================================================
=============================TABELA PROFESORI====================================
================================================================================= */
const profesoriMaterii = [
    { nume: "Gui", materie: "Fitness" },
    { nume: "Alexandru", materie: "Jogging" },
    { nume: "Sărăndan", materie: "Jogging" },
    { nume: "Datcu", materie: "Jogging" },
    { nume: "Ionescu", materie: "Jogging" },
    { nume: "Ionescu", materie: "Baschet 3X3" },
    { nume: "Molcuț", materie: "Fotbal" },
    { nume: "Szabo", materie: "Fotbal" },
    { nume: "Alexandru", materie: "Culturism" },
    { nume: "Sărăndan", materie: "Culturism" },
    { nume: "Chirilă M", materie: "Jogging" },
    { nume: "Chirilă D", materie: "Jogging" },
    { nume: "Varga", materie: "Aerobic" },
    { nume: "Ciorsac", materie: "Înot" },
    { nume: "Datcu", materie: "Fotbal" },
    { nume: "Chirilă M", materie: "Fitness" },
    { nume: "Ciorsac", materie: "Jogging" },
    { nume: "Gui", materie: "Jogging" },
    { nume: "Molcuț", materie: "Fotbal feminin" },
    { nume: "Szabo", materie: "Fotbal feminin" }
];
// Citește materia și ID-urile din tabelă
const [materiiRows] = await connection.query(`SELECT id, nume_materie FROM materii`);
// Creează un map nume_materie => id
const materieMap = {};
for (const row of materiiRows) {
    materieMap[row.nume_materie.trim()] = row.id;
}
// Creează vectorul de valori pentru inserare
const valuesProfesori = [];
for (const { nume, materie } of profesoriMaterii) {
    const id_materie = materieMap[materie.trim()];
    if (id_materie) {
        valuesProfesori.push([nume, id_materie]);
    } else {
        console.warn(`Materia "${materie}" nu a fost găsită în tabelă.`);
    }
}
// Inserează în tabela profesori
// if (valuesProfesori.length > 0) {
//   await connection.query(
//     `INSERT INTO profesori (nume_profesor, id_materie) VALUES ?`,
//     [valuesProfesori]
//   );
//   console.log('Profesorii au fost inserați cu succes.');
// }
/*===============================================================================
===============================TABELA ORAR=======================================
================================================================================= */
const orarData  = [
    { id: 0, ziua: "LUNI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
    { id: 1, ziua: "LUNI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Gui", activitate: "Fitness" },
    { id: 2, ziua: "LUNI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Alexandru+Sărăndan", activitate: "Jogging" },
    { id: 3, ziua: "LUNI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Alexandru+Sărăndan", activitate: "Jogging" },
    { id: 5, ziua: "LUNI", baza: "Baza 2", locul: "Sala", ora: "20:00", participanti: "Ionescu", activitate: "Baschet 3X3" },
    { id: 6, ziua: "LUNI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț+Szabo", activitate: "Fotbal" },
    { id: 7, ziua: "LUNI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Molcuț+Szabo", activitate: "Fotbal" },

    { id: 8, ziua: "MARTI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Alexandru", activitate: "Culturism" },
    { id: 9, ziua: "MARTI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Sărăndan", activitate: "Culturism" },
    { id: 10, ziua: "MARTI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Alexandru + Ionescu", activitate: "Jogging" },
    { id: 11, ziua: "MARTI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Chirilă M + Chirilă D", activitate: "Jogging" },
    { id: 12, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
    { id: 13, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 14, ziua: "MARTI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Cerc volei" },
    { id: 15, ziua: "MARTI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț + Datcu", activitate: "Fotbal" },
    { id: 16, ziua: "MARTI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Szabo + Datcu", activitate: "Fotbal" },

    { id: 17, ziua: "MIERCURI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
    { id: 18, ziua: "MIERCURI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Sărăndan", activitate: "Culturism" },
    { id: 19, ziua: "MIERCURI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Gui + Alexandru", activitate: "Jogging" },
    { id: 20, ziua: "MIERCURI", baza: "Baza 1", locul: "Stadion", ora: "17:30", participanti: "Alexandru + Datcu", activitate: "Jogging" },
    { id: 21, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
    { id: 22, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 23, ziua: "MIERCURI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 24, ziua: "MIERCURI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Molcuț + Szabo", activitate: "Fotbal" },

    { id: 25, ziua: "JOI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Gui", activitate: "Fitness" },
    { id: 26, ziua: "JOI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Gui", activitate: "Fitness" },
    { id: 27, ziua: "JOI", baza: "Baza 1", locul: "Stadion", ora: "16:00", participanti: "Sărăndan + Alexandru", activitate: "Jogging" },
    { id: 28, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
    { id: 29, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 30, ziua: "JOI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Ionescu", activitate: "Baschet 3X3" },
    { id: 31, ziua: "JOI", baza: "Baza 2", locul: "Teren", ora: "16:00", participanti: "Szabo + Datcu", activitate: "Fotbal" },
    { id: 32, ziua: "JOI", baza: "Baza 2", locul: "Teren", ora: "17:30", participanti: "Molcuț + Datcu", activitate: "Fotbal feminin" },

    { id: 34, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "08:00", participanti: "Sărăndan", activitate: "Culturism" },
    { id: 35, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "10:00", participanti: "Sărăndan", activitate: "Culturism" },
    { id: 36, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "12:00", participanti: "Chirilă M", activitate: "Fitness" },
    { id: 37, ziua: "VINERI", baza: "Baza 1", locul: "Sala", ora: "14:00", participanti: "Chirilă M", activitate: "Fitness" },
    { id: 38, ziua: "VINERI", baza: "Baza 1", locul: "Stadion", ora: "10:00", participanti: "Ciorsac + Ionescu", activitate: "Jogging" },
    { id: 39, ziua: "VINERI", baza: "Baza 1", locul: "Stadion", ora: "12:00", participanti: "Gui + Chirilă D", activitate: "Jogging" },
    { id: 40, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "08:00", participanti: "Ciorsac", activitate: "Înot" },
    { id: 41, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "10:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 42, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "12:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 43, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "14:00", participanti: "Varga", activitate: "Aerobic" },
    { id: 44, ziua: "VINERI", baza: "Baza 2", locul: "Sala", ora: "16:00", participanti: "Varga", activitate: "Cerc volei" },
    { id: 45, ziua: 'VINERI', baza: 'Baza 2', locul: 'Teren', ora: "", participanti: "", activitate: "" }
];
const insertOrarSQL = `
INSERT INTO orar (ziua, baza, locul, ora, participanti, activitate, nr_max_locuri)
VALUES ?;
`;
// const orarValues = orarData.map(item => [
// item.ziua, item.baza, item.locul, item.ora, item.participanti, item.activitate, 50 // 50 e nr_max_locuri implicit
// ]);

// await connection.query(insertOrarSQL, [orarValues]);
// console.log('Datele pentru orar au fost inserate.');


// Afișează tabelele
const [tables] = await connection.query('SHOW TABLES');
console.log('Tabelele din baza de date:', tables);

const [rows] = await connection.query('SELECT * FROM materii');
console.log('Conținutul tabelei materii:', rows);

const [orarRows] = await connection.query('SELECT * FROM orar');
console.table(orarRows);