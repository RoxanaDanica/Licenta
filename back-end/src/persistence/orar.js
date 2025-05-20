import { retrieveConnection } from "./db.js";

export const getOrar = async () => {
    const [orar] = await retrieveConnection().query('SELECT * FROM orar');
    return orar;
} 

export const saveOrarRows = async (aData) => {
    const query = ` INSERT INTO orar (ziua, baza, locul, participanti, activitate, nr_max_locuri, ora) VALUES (?, ?, ?, ?, ?, ?, ?) `;
    const results = [];
    for (const row of aData) {
        const { ziua, baza, locul, participanti, activitate, nr_max_locuri, ora } = row;
        const [result] = await retrieveConnection().query(query, [
            ziua,
            baza,
            locul,
            participanti,
            activitate,
            nr_max_locuri,
            ora
        ]);
        results.push(result);
    }

    return results;
}