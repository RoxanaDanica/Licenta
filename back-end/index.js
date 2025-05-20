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

app.use('/inscriere', enrolledStudents)


async function startApp() {
    await initializeDatabase(); 

    // const clearAllEnrollments = async () => {
    //     await retrieveConnection().execute('DELETE FROM studenti_inscrisi');
    // };
    
    // clearAllEnrollments();


    app.listen(3000, () => {
        console.log('Serverul rulează pe portul 3000');
    });
}

startApp();
