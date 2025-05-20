import express from 'express';
import { retriveOrar, addNewRowsOrar } from '../services/orarService.js';

const orarRouter = express.Router();

orarRouter.get('/', async (_, res) => {
    const orar = await retriveOrar();
    res.send(orar);

}); 

orarRouter.post('/', async(req, res) => {
    const data = req.body.data;
    const orar = await addNewRowsOrar(data);
    res.send(orar);
})

export default orarRouter;