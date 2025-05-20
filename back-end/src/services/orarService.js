import { getOrar, saveOrarRows } from "../persistence/orar.js";

const retriveOrar = async () => {
    const orar = await getOrar();
    return orar;
};

const addNewRowsOrar = async (aData) => {
    const orar = await saveOrarRows(aData);
    return orar;
}

export {  retriveOrar, addNewRowsOrar };