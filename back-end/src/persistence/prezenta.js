import { retrieveConnection } from "./db.js";

export const createPrezentaForSlot = async (id_slot, data) => {
    const [studenti] = await retrieveConnection().execute(
      'SELECT id_student FROM studenti_inscrisi WHERE id_slot = ?',
      [id_slot]
    );
  
    for (const { id_student } of studenti) {
      await retrieveConnection().execute(
        `INSERT INTO prezente (id_student, id_slot, data_prezentei, prezent) 
         VALUES (?, ?, ?, true)
         ON DUPLICATE KEY UPDATE prezent = true`, 
        [id_student, id_slot, data]
      );
    }

   
};

export const savePrezentaLista = async (listaPrezenta) => {
  for (const student of listaPrezenta) {

      console.log('Saving:', {
          id_student: student.id_student,
          id_slot: student.id_slot,
          data_prezentei: student.data_prezentei,
          prezent: student.prezent
      });

      await retrieveConnection().execute(
          `INSERT INTO prezente (id_student, id_slot, data_prezentei, prezent)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE prezent = ?`,
          [
              student.id_student ?? null,
              student.id_slot ?? null,
              student.data_prezentei ?? null,
              student.prezent ? 1 : 0, 
              student.prezent ? 1 : 0
          ]
      );
  }

  console.log(`Prezență salvată manual pentru ${listaPrezenta.length} studenți.`);
};


export const getPrezentaLista = async (id_slot, data) => {
  const [rows] = await retrieveConnection().execute(
      `SELECT p.id_student, s.nume, s.email, p.prezent
       FROM prezente p
       JOIN studenti s ON p.id_student = s.id
       WHERE p.id_slot = ? AND p.data_prezentei = ?`,
      [id_slot, data]
  );

  return rows;
};


export const getPrezentaListaPeSlot = async (id_slot) => {
  const [rows] = await retrieveConnection().execute(
      `SELECT p.id_student, s.nume, s.email, p.data_prezentei, p.prezent
       FROM prezente p
       JOIN studenti s ON p.id_student = s.id
       WHERE p.id_slot = ?
       ORDER BY p.data_prezentei DESC, s.nume ASC`,
      [id_slot]
  );

  return rows;
};
