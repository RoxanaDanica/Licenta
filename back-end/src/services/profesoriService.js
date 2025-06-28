import { addProfesor, deleteProfesor, getProfesori, updateProfesor, getMateriiProfesor, saveMateriiSecundare  } from "../persistence/profesori.js";

const retriveProfesori = async () => {
    const profesori = await getProfesori();
    return profesori;
};

const retriveProfesor = async (id_materie, nume_profesor) => {
    const profesor = await addProfesor(id_materie, nume_profesor);
    return profesor;
}

const retriveMateriiProfesor = async (id_profesor) => {
    return await getMateriiProfesor(id_profesor);
};

const editProfesor = async (id_materie, nume_profesor, id) => {
    const profesor = await updateProfesor(id_materie, nume_profesor, id);
    return profesor;
};

const removeProfesor = async(id) => {
    const profesor = await deleteProfesor(id);
    return profesor;
};


const salveazaMateriiSecundare = async (id_profesor, materii) => {
    return await saveMateriiSecundare(id_profesor, materii);
}


export { retriveProfesori, retriveProfesor, editProfesor, removeProfesor, retriveMateriiProfesor, salveazaMateriiSecundare };