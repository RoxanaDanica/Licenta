import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import { initializeDatabase, retrieveConnection } from './src/persistence/db.js';
import studentiRouter from './src/routes/studentiRoutes.js';
import materiRouter from './src/routes/materiiRoutes.js';
import orarRouter from './src/routes/orarRoutes.js';
import profesoriRouter from './src/routes/profesoriRoutes.js';
import enrolledStudents from './src/routes/enrolledStudentsRoutes.js';
import prezenteRouter from './src/routes/prezentaRoutes.js';


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/studenti', studentiRouter);

app.use('/materii', materiRouter);
app.use('/materie', materiRouter);


app.use('/orar', orarRouter);
app.use('/save', orarRouter);

app.use('/profesori', profesoriRouter);
app.use('/profesor', profesoriRouter); 

app.use('/inscriere', enrolledStudents);
app.use('/slot', enrolledStudents);
app.use('/studenti-inscrisi', enrolledStudents); 
app.use('/prezenta', prezenteRouter);

async function startApp() {
    await initializeDatabase(); 

    // async function addUniqueConstraint() {
    //     const connection = await retrieveConnection();
    //     try {
    //         await connection.query(`
    //             ALTER TABLE profesori_materii
    //             ADD CONSTRAINT uniq_prof_materie UNIQUE (id_profesor, id_materie)
    //         `);
    //         console.log("UNIQUE constraint adăugat cu succes pe (id_profesor, id_materie).");
    //     } catch (err) {
    //         if (err.code === 'ER_DUP_KEYNAME' || err.message.includes('Duplicate key name')) {
    //             console.log("UNIQUE constraint există deja.");
    //         } else {
    //             console.error("Eroare la adăugarea UNIQUE constraint:", err);
    //         }
    //     } finally {
    //         await connection.end();
    //     }
    // }
    
    // addUniqueConstraint(); 


    // const clearAllEnrollments = async () => {
    //     await retrieveConnection().execute('DELETE FROM studenti_inscrisi');
    // };
     
    // clearAllEnrollments();

    // const  modificaTabelaStudenti = async () => {
    //     // Adaugă coloanele dacă nu există
    //     await retrieveConnection().execute(`ALTER TABLE studenti ADD COLUMN name VARCHAR(100)`);
    //     await retrieveConnection().execute(`ALTER TABLE studenti ADD COLUMN email VARCHAR(100)`);
    
    //     // Lista de nume random
    //     const numePrenume = [
    //         "Andrei Popescu", "Maria Ionescu", "Ion Georgescu", "Elena Dumitrescu",
    //         "Vlad Marinescu", "Ioana Radu", "George Iliescu", "Ana Mihai",
    //         "Rares Stan", "Larisa Neagu"
    //     ];
    
    //     for (let i = 0; i < numePrenume.length; i++) {
    //         const [prenume, nume] = numePrenume[i].split(" ");
    //         const email = `${prenume.toLowerCase()}.${nume.toLowerCase()}@studenti.univ.ro`;
    
    //         await retrieveConnection().execute(
    //             `UPDATE studenti SET name = ?, email = ? WHERE id = ?`,
    //             [numePrenume[i], email, i + 1]
    //         );
    //     }
    
    //     console.log("Tabela studenti a fost actualizată cu nume și emailuri.");
    // }
    // modificaTabelaStudenti();
    // await retrieveConnection().execute(`ALTER TABLE studenti CHANGE name nume VARCHAR(100)`);


    // app.listen(3000, () => {
    //     console.log('Serverul rulează pe portul 3000');
    // });



    //     const modificaTabelaProfesori = async () => {
//       const connection = await retrieveConnection();
//       try {
//           await connection.execute(`ALTER TABLE profesori ADD COLUMN email VARCHAR(100)`);
//           console.log('Coloana "email" a fost adăugată.');
//       } catch (err) {
//           if (err.code === 'ER_DUP_FIELDNAME') {
//               console.log('Coloana "email" există deja.');
//           } else {
//               throw err;
//           }
//       }
  
//       try {
//           await connection.execute(`ALTER TABLE profesori ADD COLUMN password VARCHAR(100)`);
//           console.log('Coloana "password" a fost adăugată.');
//       } catch (err) {
//           if (err.code === 'ER_DUP_FIELDNAME') {
//               console.log('Coloana "password" există deja.');
//           } else {
//               throw err;
//           }
//       }
  
//       try {
//           await connection.execute(`ALTER TABLE profesori ADD COLUMN rol VARCHAR(50) DEFAULT 'profesor'`);
//           console.log('Coloana "rol" a fost adăugată.');
//       } catch (err) {
//           if (err.code === 'ER_DUP_FIELDNAME') {
//               console.log('Coloana "rol" există deja.');
//           } else {
//               throw err;
//           }
//       }
//   };

//   modificaTabelaProfesori();

//   const insertProfesori = async () => {
//     const connection = await retrieveConnection();

//     // Lista de nume unice profesori (fără duplicate)
//     const profesori = [
//         "Gui", "Alexandru", "Sărăndan", "Ionescu", "Molcuț",
//         "Szabo", "Datcu", "Varga", "Chirilă M", "Ciorsac"
//     ];

//     for (const nume_profesor of profesori) {
//         // INSERT IGNORE pentru a evita duplicate la rerulare
//         await connection.execute(`
//             INSERT IGNORE INTO profesori (nume_profesor, email, password, rol)
//             VALUES (?, '', 'profesor', 'profesor')
//         `, [nume_profesor]);
//     }

//     console.log("Profesorii au fost inserați cu succes în tabela profesori.");
// };
// const updateParolaProfesori = async () => {
//   const connection = await retrieveConnection();

//   await connection.execute(`
//       UPDATE profesori SET password = 'profesor'
//   `);

//   console.log("Toți profesorii au acum parola setată la 'profesor'.");
// };

// updateParolaProfesori();
  
    if (process.env.NODE_ENV !== 'test') {
        app.listen(3000, () => {
          console.log('Serverul rulează pe portul 3000');
        });
    }
      
}
export default app;

startApp();
