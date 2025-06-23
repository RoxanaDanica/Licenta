import { retrieveConnection } from "./db.js";

export const createPrezentaForSlot = async (id_slot, data) => {
    const connection = retrieveConnection();
  
    const [studenti] = await connection.execute(
      'SELECT id_student FROM studenti_inscrisi WHERE id_slot = ?',
      [id_slot]
    );
  
    for (const { id_student } of studenti) {
      await connection.execute(
        `INSERT INTO prezente (id_student, id_slot, data_prezentei, prezent) 
         VALUES (?, ?, ?, true)
         ON DUPLICATE KEY UPDATE prezent = true`, 
        [id_student, id_slot, data]
      );
    }

   
};
