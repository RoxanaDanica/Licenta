import { retrieveConnection } from "./db.js";

// export const getOrar = async () => {
//     const [orar] = await retrieveConnection().query(`
//         SELECT 
//             o.*, 
//             COUNT(si.id_slot) AS ocupate
//         FROM 
//             orar o
//         LEFT JOIN 
//             studenti_inscrisi si ON o.id = si.id_slot
//         GROUP BY  
//             o.id
//     `);
//     return orar; 
// }
export const getOrar = async () => {
  const [orar] = await retrieveConnection().query(`
      SELECT 
          o.id,
          o.ziua,
          o.baza,
          o.locul,
          o.participanti,
          o.activitate,
          o.nr_max_locuri,
          o.ora,
          COUNT(studenti_inscrisi.id_student) AS ocupate
      FROM 
          orar o
      LEFT JOIN 
          studenti_inscrisi ON o.id = studenti_inscrisi.id_slot
      GROUP BY 
          o.id, o.ziua, o.baza, o.locul, o.participanti, o.activitate, o.nr_max_locuri, o.ora
  `);
  return orar;
}
 

export const isOverCapacity = async (id) => {
  const [rows] = await retrieveConnection().query(`
    SELECT  orar.nr_max_locuri, COUNT(studenti_inscrisi.id_slot) AS ocupate
    FROM 
      orar 
    LEFT JOIN 
      studenti_inscrisi ON orar.id = studenti_inscrisi.id_slot WHERE orar.id = ? GROUP BY orar.id `, [id]);
  if (rows.length === 0) {
    return null
  };
  return rows[0];
};


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

        if (id && Number(id) > 0) {
          const capacityInfo = await isOverCapacity(id); 
        
          if (!capacityInfo) {
            throw new Error(`Slotul cu ID ${id} nu a fost găsit.`);
          }
        
          const { ocupate } = capacityInfo;
        
          if (nr_max_locuri && parseInt(nr_max_locuri) < ocupate) {
            throw new Error(`Nu poți seta un număr maxim de locuri (${nr_max_locuri}) mai mic decât cele deja ocupate (${ocupate}).`);
          }
        }
      
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



