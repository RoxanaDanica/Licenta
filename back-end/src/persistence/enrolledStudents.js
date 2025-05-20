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
    if (inscrieri[0].total >= 1) {
        // return res.status(403).json({ message: 'Maxim o înscriere permisa.' });
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
    await retrieveConnection().execute('INSERT INTO studenti_inscrisi (id_student, id_slot) VALUES (?, ?)', [id_student, id_slot]);

    const [[updatedSlot]] = await retrieveConnection().execute(
        `SELECT 
        COUNT(*) as ocupate, 
        (SELECT nr_max_locuri FROM orar WHERE id = ?) as maxim
        FROM studenti_inscrisi 
        WHERE id_slot = ?`,
        [id_slot, id_slot]
    );

    const statusLocuri = `${updatedSlot.ocupate}`;
    return statusLocuri;
    // res.status(200).json({ 
    //     message: 'Înscriere realizată cu succes',
    //     locuri: statusLocuri
    // }); 
}

