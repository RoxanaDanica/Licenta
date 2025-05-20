import { addProfesor, deleteProfesor, getProfesori, updateProfesor } from "../persistence/profesori.js";

const retriveProfesori = async () => {
    const profesori = await getProfesori();
    return profesori;
};

const retriveProfesor = async (id_materie, nume_profesor) => {
    const profesor = await addProfesor(id_materie, nume_profesor);
    return profesor;
}

const editProfesor = async (id_materie, nume_profesor, id) => {
    const profesor = await updateProfesor(id_materie, nume_profesor, id);
    return profesor;
};

const removeProfesor = async(id) => {
    const profesor = await deleteProfesor(id);
    return profesor;
};

export { retriveProfesori, retriveProfesor, editProfesor, removeProfesor };