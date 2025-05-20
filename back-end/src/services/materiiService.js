import { addMaterie, getMaterii, deleteMaterie, updateMaterie } from "../persistence/materii.js";

const retriveMaterii = async () => {
    const materii = await getMaterii();
    return materii;
};

const retriveMaterie = async (nume_materie) => {
    const materie = await addMaterie(nume_materie);
    return materie;
};

const removeMaterie  = async(id) => {
    const materie = await deleteMaterie(id);
    return materie;
}

const editMaterie = async(id, nume_materie) => {
    const materie = await updateMaterie(id, nume_materie);
    return materie;
}


export { retriveMaterii, retriveMaterie, removeMaterie, editMaterie };

