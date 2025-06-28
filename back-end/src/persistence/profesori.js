import { retrieveConnection } from "./db.js";

export const getProfesori = async () => {
    const [profesori] = await retrieveConnection().query(`
        SELECT  *
        FROM profesori 
        INNER JOIN materii ON profesori.id_materie = materii.id
    `);

    return profesori;
}  



export const addProfesor = async (id_materie, nume_profesor) => { /* join nume materie */
    const insertQuery = ` INSERT INTO profesori (id_materie, nume_profesor) VALUES (?, ?) `;
    const selectQuery = `SELECT p.id, p.nume_profesor, m.nume_materie FROM profesori p JOIN materii m ON p.id_materie = m.id WHERE p.id = ? `;

    const [result] = await retrieveConnection().query(insertQuery, [id_materie, nume_profesor]);
    const profesorId = result.insertId;
    const [rows] = await retrieveConnection().query(selectQuery, [profesorId]);
    
    return rows;
}

export const updateProfesor = async (id_materie, nume_profesor, id) => {
    const query = `UPDATE profesori  SET id_materie = ?, nume_profesor = ? WHERE id = ? `;
    const profesor = await retrieveConnection().query(query, [id_materie, nume_profesor, id])
    return profesor;
}

export const deleteProfesor = async (id) => {
    const query = ` DELETE FROM profesori WHERE id = ? `;
    const profesor = await retrieveConnection().query(query, [id]);
    return profesor;
}

export const getMateriiProfesor = async (id_profesor) => {
    const [rows] = await retrieveConnection().execute(
        `SELECT m.id, m.nume_materie 
         FROM profesori_materii pm 
         JOIN materii m ON pm.id_materie = m.id
         WHERE pm.id_profesor = ?`,
        [id_profesor]
    );
    return rows;
};
export const saveMateriiSecundare = async (id_profesor, materii) => {
    const connection = await retrieveConnection();
    await connection.query(`DELETE FROM profesori_materii WHERE id_profesor = ?`, [id_profesor]);

    for (const id_materie of materii) {
        await connection.query(
            `INSERT INTO profesori_materii (id_profesor, id_materie) VALUES (?, ?)`,
            [id_profesor, id_materie]
        );
    }
};
