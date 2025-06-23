import { retrieveConnection } from "./db.js";

export const isStudentEnrolled = async (id_student, id_slot) => {
    const [exist] = await retrieveConnection().execute( 'SELECT * FROM studenti_inscrisi WHERE id_student = ? AND id_slot = ?', [id_student, id_slot] );
    if(exist.length >=1 ) {
        return true;
    } else { 
        return false;
    }
} 
 
export const hasReachedMaxEnrollments = async(id_student) => {
    const [inscrieri] = await retrieveConnection().execute('SELECT COUNT(*) as total FROM studenti_inscrisi WHERE id_student = ?', [id_student] );
    if (inscrieri[0].total >= 7) {
        return true;
    }
}


export const isMaxSlotsReached = async (id_slot) => {
    const [[slot]] = await retrieveConnection().execute(`SELECT nr_max_locuri FROM orar WHERE id = ?`, [id_slot] );
    const [[{ ocupate }]] = await retrieveConnection().execute( `SELECT COUNT(*) AS ocupate FROM studenti_inscrisi WHERE id_slot = ?`, [id_slot] );
    console.log("LOCURI:", ocupate, "/", slot.nr_max_locuri); 

    if (Number(ocupate) >= Number(slot.nr_max_locuri)) {
        return true;
    }
};
 
export const enrollStudentInCourse = async(id_student, id_slot) => {
    const [student_inscris] = await retrieveConnection().execute('INSERT INTO studenti_inscrisi (id_student, id_slot) VALUES (?, ?)', [id_student, id_slot]);
    return student_inscris;
}

export const retrieveEnrolledStudentsBySlot = async (id_slot) => {
    const [students] = await retrieveConnection().execute(
        `
        SELECT studenti.id, studenti.nume, orar.ziua, orar.baza, orar.locul, orar.participanti, orar.activitate, orar.ora
        FROM orar
        JOIN studenti_inscrisi ON orar.id = studenti_inscrisi.id_slot
        JOIN studenti ON studenti_inscrisi.id_student = studenti.id
        WHERE orar.id = ?
        `,
        [id_slot]
    );

    return students;
};