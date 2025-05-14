import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import initializeDatabase from './db.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

async function startApp() {
    const connection = await initializeDatabase(); 


    /* TABELA STUDENTI_INSCRISI */
    app.post('/inscriere', async (req, res) => {
        const { id_student, id_slot } = req.body;
        console.log('req.body',req.body);
      
        if (!id_student || !id_slot) {
          return res.status(400).json({ message: 'Date lipsă' });
        }
        
        try {
            // 1. Verifică dacă studentul e deja înscris la acel slot
            const [exist] = await connection.execute(
                'SELECT * FROM studenti_inscrisi WHERE id_student = ? AND id_slot = ?',
                [id_student, id_slot]
            );

            if (exist.length > 0) {
                return res.status(409).json({ message: 'Deja înscris la acest slot' });
            }

            // 2. Verifică dacă e deja înscris în 3 sloturi
            const [inscrieri] = await connection.execute(
                'SELECT COUNT(*) as total FROM studenti_inscrisi WHERE id_student = ?',
                [id_student]
            );

            if (inscrieri[0].total >= 3) {
                return res.status(403).json({ message: 'Maxim 3 înscrieri permise' });
            }

            //Verificam daca slotul este disponibil
            [ [infoSlot] ] = await connection.execute(
                `SELECT 
                    (SELECT COUNT(*) FROM studenti_inscrisi WHERE id_slot = ?) as ocupate,
                    (SELECT nr_max_locuri FROM orar WHERE id = ?) as maxim
                `,
                [id_slot, id_slot]
            );

            if (infoSlot.ocupate >= infoSlot.maxim) {
                return res.status(403).json({ message: 'Nu mai sunt locuri disponibile' });
            }
                

            // 3. Inscriere
            await connection.execute(
                'INSERT INTO studenti_inscrisi (id_student, id_slot) VALUES (?, ?)',
                [id_student, id_slot]
            );

            res.status(200).json({ message: 'Înscriere realizată cu succes' });
        } catch (error) {
            console.error('Eroare la înscriere:', error);
            res.status(303).json({ message: 'Eroare inscriere' });
        }
      });

      //sloturi ocupate
      app.get('/slot/:id', async (req, res) => {
        const id_slot = req.params.id;
    
        try {
            const infoSlot = await connection.execute(
                `SELECT 
                    o.nr_max_locuri AS maxim,
                    COUNT(s.id_student) AS ocupate
                FROM orar o
                LEFT JOIN studenti_inscrisi s ON o.id = s.id_slot
                WHERE o.id = ?
                GROUP BY o.id`,
                [id_slot]
            );

            const locuriOcupate = infoSlot[0]?.[0]?.ocupate;
    
            res.json({ locuriOcupate });
        } catch (err) {
            console.error('Eroare la interogare locuri:', err);
            res.status(500).json({ message: 'Eroare server' });
        }
    });
    
          /* TABLE Studenti_inscrisi */
    app.get('/studenti-inscrisi', async (req, res) => {
        try {
            const [studenti_inscrisi] = await connection.query('SELECT * FROM studenti_inscrisi');
            res.json(studenti_inscrisi);
        } catch (error) {
            console.error('Eroare la obținerea studentiilor:', error);
            res.status(404).json({ message: 'Eroare studenti' });
        }
    });

    /* TABLE Studenti */
    app.get('/studenti', async (req, res) => {
        try {
            const [studenti] = await connection.query('SELECT * FROM studenti');
            res.json(studenti);
        } catch (error) {
            console.error('Eroare la obținerea studentiilor:', error);
            res.status(404).json({ message: 'Eroare studenti' });
        }
    });
    /* TABLE MATERII */
    app.get('/materii', async (req, res) => {
        try {
            const [materii] = await connection.query('SELECT * FROM materii');
            res.json(materii);
        } catch (error) {
            console.error('Eroare la obținerea materiilor:', error);
            res.status(404).json({ message: 'Eroare materii' });
        }
    });

    /* add materie */
    app.post('/materie', async (req, res) => {
        const { nume_materie } = req.body;
    
        try {
            const query = `
                INSERT INTO materii (nume_materie)
                VALUES (?)
            `;
            await connection.query(query, [nume_materie]);
    
            res.status(200).json({ message: 'Materie salvata cu succes' });
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(404).json({ message: 'Eroare la salvare' });
        }
    });
    /* update materie */
    app.put('/materie/:id', async (req, res) => {
        const { id } = req.params; 
        const { nume_materie } = req.body; 
    
        try {
            const query = `
                UPDATE materii
                SET nume_materie = ?
                WHERE id = ?
            `;
            await connection.query(query, [nume_materie, id]);
    
            res.status(200).json({ message: 'Materie actualizată cu succes' });
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(404).json({ message: 'Eroare la actualizare' });
        }
    });
    /* delete materie */
    app.delete('/materie/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = `
                DELETE FROM materii
                WHERE id = ?
            `;
            const result = await connection.query(query, [id]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Materie nu găsită' });
            }
    
            res.status(200).json({ message: 'Materie ștearsă cu succes' });
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(404).json({ message: 'Eroare la ștergere' });
        }
    });
    
    
    /* TABLE ORAR */
    app.get('/orar', async(req, res) => {
        try {
            const [orar] = await connection.query('SELECT * FROM orar');
            console.log('orar din db: ', orar);
            res.json(orar);
        } catch (error) {
            console.log('eroare orar===>',error);
            console.error('Eroare la obținerea datelor:', error);
            res.status(404).json({ message: 'Eroare orar:' });
            // res.error(error);
        }
    });

    app.post('/save', async (req, res) => {
        const aData = req.body.data;
    
        if (!Array.isArray(aData) || aData.length === 0) {
            return res.status(404).json({ message: 'Datele lipsa' });
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
            res.status(404).json({ message: 'Eroare la salvare' });
        }
    });


    /* TABLE PROFESORI */
    app.get('/profesori', async (req, res) => {
        try {
            const [profesori] = await connection.query(`
                SELECT  profesori.id,  profesori.nume_profesor, profesori.id_materie, materii.nume_materie 
                FROM profesori 
                INNER JOIN materii ON profesori.id_materie = materii.id
            `);

            res.json(profesori);
        } catch (error) {
            console.error('Eroare profesori:', error);
            res.status(404).json({ message: 'Eroare' }); 
        }
    });
    

    /* add profesor( JOIN pentru nume_materie)*/
    app.post('/profesor', async (req, res) => {
        const { id_materie, nume_profesor } = req.body;

        try {
            const insertQuery = `
                INSERT INTO profesori (id_materie, nume_profesor)
                VALUES (?, ?)
            `;
            const [result] = await connection.query(insertQuery, [id_materie, nume_profesor]);

            const profesorId = result.insertId;

            const selectQuery = `
                SELECT p.id, p.nume_profesor, m.nume_materie
                FROM profesori p
                JOIN materii m ON p.id_materie = m.id
                WHERE p.id = ?
            `;
            const [rows] = await connection.query(selectQuery, [profesorId]);

            res.status(200).json(rows[0]);
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(404).json({ message: 'Eroare la salvare' });
        }
    });

    /* update profesor */
    app.put('/profesor/:id', async (req, res) => {
        const { id } = req.params;
        const { id_materie, nume_profesor } = req.body;
    
        try {
        const query = `
            UPDATE profesori 
            SET id_materie = ?, nume_profesor = ?
            WHERE id = ?
        `;
        await connection.query(query, [id_materie, nume_profesor, id]);
    
        res.status(200).json({ message: 'Profesor actualizat cu succes' });
        } catch (error) {
        console.error('Eroare la db:', error);
        res.status(404).json({ message: 'Eroare la actualizare' });
        }
    });

    /* delete profesor */
    app.delete('/profesor/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
            const query = `
                DELETE FROM profesori
                WHERE id = ?
            `;
            const result = await connection.query(query, [id]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Profesorul nu a fost  găsit' });
            }
    
            res.status(200).json({ message: 'Profesor ștear cu succes' });
        } catch (error) {
            console.error('Eroare la db:', error);
            res.status(404).json({ message: 'Eroare la ștergere' });
        }
    });
        

    app.listen(3000, () => {
        console.log('Serverul rulează pe portul 3000');
    });
}

startApp();
