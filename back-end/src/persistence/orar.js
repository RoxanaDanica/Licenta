import { retrieveConnection } from "./db.js";

// export const getOrar = async () => {
//     const [orar] = await retrieveConnection().query('SELECT * FROM orar');
//     return orar;
// } 
export const getOrar = async () => {
    const [orar] = await retrieveConnection().query(`
        SELECT 
            o.*, 
            COUNT(si.id_slot) AS ocupate
        FROM 
            orar o
        LEFT JOIN 
            studenti_inscrisi si ON o.id = si.id_slot
        GROUP BY 
            o.id
    `);
    return orar; 
}


// export const saveOrarRows = async (aData) => {
//     const query = ` INSERT INTO orar (ziua, baza, locul, participanti, activitate, nr_max_locuri, ora) VALUES (?, ?, ?, ?, ?, ?, ?) `;
//     const results = [];
//     for (const row of aData) {
//         const { ziua, baza, locul, participanti, activitate, nr_max_locuri, ora } = row;
//         const [result] = await retrieveConnection().query(query, [
//             ziua,
//             baza,
//             locul,
//             participanti,
//             activitate,
//             nr_max_locuri,
//             ora
//         ]);
//         results.push(result);
//     }

//     return results;
// }
export const saveOrarRows = async (aData) => {
    const insertQuery = `
        INSERT INTO orar (ziua, baza, locul, participanti, activitate, nr_max_locuri, ora)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const updateQuery = `
        UPDATE orar
        SET ziua = ?, baza = ?, locul = ?, participanti = ?, activitate = ?, nr_max_locuri = ?, ora = ?
        WHERE id = ?
    `;

    const results = [];

    for (const row of aData) {
        const {
          id,
          ziua,
          baza,
          locul,
          ora,
          activitate,
          participanti,
          nr_max_locuri
        } = row;
      
        const hasData = activitate?.trim() || participanti?.trim() || nr_max_locuri;
      
        if (id && Number(id) > 0) {
          // UPDATE
          const [result] = await retrieveConnection().query(updateQuery, [
            ziua,
            baza,
            locul,
            participanti,
            activitate,
            nr_max_locuri,
            ora,
            id
          ]);
          results.push(result);
        } else if (hasData) {
          // INSERT
          const [result] = await retrieveConnection().query(insertQuery, [
            ziua,
            baza,
            locul,
            participanti,
            activitate,
            nr_max_locuri,
            ora
          ]);
          results.push(result);
        } else { 
          // Slot gol, nu facem nimic
          continue;
        }
      }
      
};



