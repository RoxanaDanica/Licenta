import express from 'express';
import { prezentaForSlot } from '../services/prezentaService.js';

const router = express.Router();

router.post('/lansare', async (req, res) => {
    const { id_slot, data } = req.body;

    const prezenta = await prezentaForSlot(id_slot, data);
    res.send(prezenta);
}); 

export default router;
