import express from 'express';
import { editProfesor, removeProfesor, retriveProfesor, retriveProfesori } from '../services/profesoriService.js';

const profesoriRouter = express.Router();

profesoriRouter.get('/', async (_, res) => {
    const profesori = await retriveProfesori();
    res.send(profesori);

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

export default profesoriRouter;