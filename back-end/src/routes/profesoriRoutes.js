import express from 'express';
import { editProfesor, removeProfesor, retriveProfesor, retriveProfesori, retriveMateriiProfesor, salveazaMateriiSecundare } from '../services/profesoriService.js';

const profesoriRouter = express.Router();

profesoriRouter.get('/', async (_, res) => {
    const profesori = await retriveProfesori();
    res.send(profesori);

}); 

profesoriRouter.get('/:id_profesor/materii', async (req, res) => {
    const { id_profesor } = req.params;
    const materii = await retriveMateriiProfesor(id_profesor);
    res.send(materii);
});

profesoriRouter.post('/', async (req, res) => {
    const { id_materie, nume_profesor } = req.body;

    const profesor = await retriveProfesor(id_materie, nume_profesor);
    res.send(profesor);
});

profesoriRouter.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { id_materie, nume_profesor } = req.body;

    const profesor = await editProfesor(id_materie, nume_profesor, id);
    res.send(profesor);

});

profesoriRouter.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const profesor = await removeProfesor(id);
    res.send(profesor);
});

profesoriRouter.post('/:id/materii', async (req, res) => {
    const { id } = req.params;
    const { materii } = req.body;

    try {
        await salveazaMateriiSecundare(id, materii);
        res.send({ message: 'Materiile secundare au fost salvate.' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la salvarea materiilor secundare.' });
    }
});


export default profesoriRouter;