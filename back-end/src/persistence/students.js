import { retrieveConnection } from "./db.js";

export const readAllStudents = async () => {
    const [studenti] = await retrieveConnection().query('SELECT * FROM studenti');
    return studenti;
};

export const readEnrolledStudents = async () => {
    const [studenti_inscrisi] = await retrieveConnection().query('SELECT * FROM studenti_inscrisi');
    return studenti_inscrisi;
}
