import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import initializeDatabase from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function startApp() {
    const connection = await initializeDatabase(); 

    app.get('/materii', async (req, res) => {
        try {
            const [materii] = await connection.query('SELECT * FROM materii');
            res.json(materii);
        } catch (error) {
            console.error('Eroare la obținerea materiilor:', error);
            res.status(404).json({ message: 'Eroare materii' });
        }
    });

    app.get('/orar', async(req, res) => {
        try {
            const [orar] = await connection.query('SELECT * FROM orar');
            res.json(orar);
        } catch (error) {
            console.log('eroare orar===>',error);
            console.error('Eroare la obținerea datelor:', error);
            res.status(404).json({ message: 'Eroare orar:' });
            // res.error(error);
        }
    });

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
            res.status(404).json({ message: 'Eroare' }); 
        }
    });

    app.post('/save', async (req, res) => {
        const aData = req.body.data;
    
        if (!Array.isArray(aData) || aData.length === 0) {
            return res.status(400).json({ message: 'Datele lipsa' });
        }
    
        try { 
            const query = `
                INSERT INTO orar (ziua, baza, locul, participanti, activitate, nr_max_locuri, ora)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
    
            for (const row of aData) {
                const { ziua, baza, locul, participanti, activitate, nr_max_locuri, ora } = row;
                await connection.query(query, [ 
                    ziua,
                    baza,
                    locul,
                    participanti,
                    activitate,
                    nr_max_locuri,
                    ora
                ]);
            }
    
            res.status(200).json({ message: 'Activitățile au fost salvate cu succes' });
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(500).json({ message: 'Eroare la salvare' });
        }
    });
    
    



    app.listen(3000, () => {
        console.log('Serverul rulează pe portul 3000');
    });
}

startApp();
