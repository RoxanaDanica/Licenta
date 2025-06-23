import { createPrezentaForSlot, savePrezentaLista, getPrezentaListaPeSlot } from '../persistence/prezenta.js';

const prezentaForSlot = async (id_slot, data) => {
    const prezenta = await createPrezentaForSlot(id_slot, data);
    return prezenta;
}

const savePrezenta = async (listaPrezenta) => {
  const rezultat = await savePrezentaLista(listaPrezenta);
  return rezultat;
};

const getPrezenta = async (id_slot, data) => {
  const lista = await getPrezentaLista(id_slot, data);
  return lista;
};

const retrivePrezentaPeSlot = async (id_slot) => {
  const lista = await getPrezentaListaPeSlot(id_slot);  
  return lista;
};
export { prezentaForSlot, savePrezenta, getPrezenta, retrivePrezentaPeSlot }