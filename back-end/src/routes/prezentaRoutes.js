import express from 'express';
import { prezentaForSlot, savePrezenta, getPrezenta, retrivePrezentaPeSlot } from '../services/prezentaService.js';

const router = express.Router();

router.post('/lansare', async (req, res) => {
    const { id_slot, data } = req.body;

    const prezenta = await prezentaForSlot(id_slot, data);
    res.send(prezenta);
}); 

router.post('/salvare', async (req, res) => {
    try {
        const listaPrezenta = req.body;

        if (!Array.isArray(listaPrezenta)) {
            return res.status(400).json({ error: 'Format greșit: trebuie să trimiți o listă de prezențe.' });
        }

        const rezultat = await savePrezenta(listaPrezenta);
        res.status(200).json({ message: 'Prezența a fost salvată cu succes.', rezultat });
    } catch (error) {
        console.error('Eroare la salvarea prezenței:', error);
        res.status(500).json({ error: 'Eroare server la salvarea prezenței.' });
    }
});


router.get('/lista', async (req, res) => {
    try { 
        const { id_slot, data } = req.query;

        if (!id_slot || !data) {
            return res.status(400).json({ error: 'Trebuie să specifici id_slot și data (YYYY-MM-DD).' });
        }

        const lista = await getPrezenta(id_slot, data);
        res.status(200).json(lista);
    } catch (error) {
        console.error('Eroare la preluarea listei prezenței:', error);
        res.status(500).json({ error: 'Eroare server la preluarea listei prezenței.' });
    }
});

router.get('/:id', async (req, res) => {
    try { 
        const id_slot = req.params.id;

        if (!id_slot) {
            return res.status(400).json({ error: 'Trebuie să specifici id_slot.' });
        }

        const lista = await retrivePrezentaPeSlot(id_slot);
        res.status(200).json(lista);
    } catch (error) {
        console.error('Eroare la preluarea prezenței pe slot:', error);
        res.status(500).json({ error: 'Eroare server la preluarea prezenței pe slot.' });
    }
});
 

export default router;
