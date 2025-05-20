import express from 'express';
import { retriveMaterii, retriveMaterie, removeMaterie, editMaterie } from '../services/materiiService.js';

const materiiRouter = express.Router();

materiiRouter.get('/', async (_, res) => {
    const materii = await retriveMaterii();
    res.send(materii);

}); 

materiiRouter.post('/', async (req, res) => {
    const { nume_materie } = req.body;
    const materie = await retriveMaterie(nume_materie);
    res.send(materie);
});

materiiRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const materie = await removeMaterie(id);
    res.send(materie);
});

materiiRouter.put('/:id', async(req, res) => {
    const { nume_materie } = req.body;
    const { id } = req.params;
    const materie = await editMaterie(id, nume_materie);
    res.send(materie);
});

export default materiiRouter;
