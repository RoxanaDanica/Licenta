import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import { initializeDatabase, retrieveConnection } from './src/persistence/db.js';
import studentiRouter from './src/routes/studentiRoutes.js';
import materiRouter from './src/routes/materiiRoutes.js';
import orarRouter from './src/routes/orarRoutes.js';
import profesoriRouter from './src/routes/profesoriRoutes.js';
import enrolledStudents from './src/routes/enrolledStudentsRoutes.js';

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

async function startApp() {
    await initializeDatabase(); 

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


    app.listen(3000, () => {
        console.log('Serverul rulează pe portul 3000');
    });
}

startApp();
