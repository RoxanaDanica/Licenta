import { createPrezentaForSlot } from '../persistence/prezenta.js';

const prezentaForSlot = async (id_slot, data) => {
    const prezenta = await createPrezentaForSlot(id_slot, data);
    return prezenta;
}

export { prezentaForSlot }