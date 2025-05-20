import { retrieveConnection } from "./db.js";

export const getMaterii = async () => {
    const [materii] = await retrieveConnection().query('SELECT * FROM materii');
    return materii;
} 

export const addMaterie = async (nume_materie) => {
    const query = `INSERT INTO materii (nume_materie) VALUES (?)`;
    const [materie] = await retrieveConnection().query(query, [nume_materie]);
    return materie;
};

export const deleteMaterie = async (id) => {
    const query = `  DELETE FROM materii  WHERE id = ? `;
    const [materie] = await retrieveConnection().query(query, [id]);
    return materie;
}

export const updateMaterie = async(id, nume_materie) => {
    const query = ` UPDATE materii SET nume_materie = ? WHERE id = ? `;
    const [materie] = await retrieveConnection().query(query, [nume_materie, id]);
    return materie;
}
