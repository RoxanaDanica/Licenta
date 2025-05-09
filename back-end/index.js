import express from 'express';
import initializeDatabase from './db.js';
import cors from 'cors'; 

const app = express();

app.use(cors());

async function startApp() {
    const connection = await initializeDatabase(); 

    app.get('/materii', async (req, res) => {
        try {
            const [materii] = await connection.query('SELECT * FROM materii');
            res.json(materii);
        } catch (error) {
            console.error('Eroare la obținerea materiilor:', error);
            res.status(500).json({ message: 'Eroare materii' });
        }
    });

    app.get('/orar', async(req, res) => {
        try {
            const [orar] = await connection.query('SELECT * FROM orar');
            res.json(orar);
        } catch (error) {
            console.log('eroare orar===>',error);
            console.error('Eroare la obținerea datelor:', error);
            res.status(500).json({ message: 'Eroare orar:' });
            // res.error(error);
        }
    });

    // app.get('/profesori', async(req, res) => {
    //     try {
    //         const [profesori] = await connection.query('SELECT * FROM profesori');
    //         res.json(profesori);
    //     } catch (error) {
    //         console.error('Eroare profesori:', error);
    //         res.status(500).json({ message: 'Eroare' });
    //     }
    // })
    app.get('/profesori', async (req, res) => {
        try {
            const [profesori] = await connection.query(`
                SELECT profesori.id, profesori.nume_profesor, materii.nume_materie 
                FROM profesori 
                INNER JOIN materii ON profesori.id_materie = materii.id
            `);

            res.json(profesori);
        } catch (error) {
            console.error('Eroare profesori:', error);
            res.status(500).json({ message: 'Eroare' }); 
        }
    });




    app.listen(3000, () => {
        console.log('Serverul rulează pe portul 3000');
    });
}

startApp();
