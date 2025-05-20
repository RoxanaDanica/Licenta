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

// export const isMaxSlotsReached = async (id_slot) => {
//     const [[infoSlot]] = await retrieveConnection().execute(
//         `SELECT 
//             COUNT(s.id_student) AS ocupate,
//             o.nr_max_locuri AS maxim
//         FROM orar o
//         LEFT JOIN studenti_inscrisi s ON o.id = s.id_slot
//         WHERE o.id = ?
//         GROUP BY o.nr_max_locuri`,
//         [id_slot]
//     );

//     if (!infoSlot || infoSlot.maxim === null) {
//         throw new Error("Slot inexistent sau fără limită definită.");
//     } else if(infoSlot.ocupate >= infoSlot.maxim) {
//         return true;
//     }
// };

export const isMaxSlotsReached = async (id_slot) => {
    console.log("Verific pentru id_slot:", id_slot); 
    const connection = retrieveConnection();

    // Ia numărul maxim de locuri direct din slotul cerut
    const [[slot]] = await connection.execute(
        `SELECT nr_max_locuri FROM orar WHERE id = ?`,
        [id_slot]
    );

    if (!slot) {
        throw new Error(`Slotul cu id ${id_slot} nu există în tabela orar.`);
    }

    // Ia numărul de studenți înscriși la acest slot
    const [[{ ocupate }]] = await connection.execute(
        `SELECT COUNT(*) AS ocupate FROM studenti_inscrisi WHERE id_slot = ?`,
        [id_slot]
    );

    console.log("LOCURI:", ocupate, "/", slot.nr_max_locuri); 

    if (Number(ocupate) >= Number(slot.nr_max_locuri)) {
        console.log("Nu mai sunt locuri");
        return true;
    }

    // return true;
};




// export const isMaxSlotsReached = async (id_slot) => {
//     const [[result]] = await retrieveConnection().execute(
//         `SELECT 
//             (SELECT COUNT(*) FROM studenti_inscrisi WHERE id_slot = ?) AS ocupate,
//             (SELECT nr_max_locuri FROM orar WHERE id = ?) AS maxim
//         `,
//         [id_slot, id_slot]
//     );

//     if(result.ocupate >= result.maxim) {
//         console.log('Nu mai sunt locuri'); 
//         return true;
//     }

//     console.log("LOCURI:", result.ocupate, "/", result.maxim);

//     return true;
// };

 
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

