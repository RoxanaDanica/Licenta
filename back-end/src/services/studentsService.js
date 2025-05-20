import { readAllStudents, readEnrolledStudents } from '../persistence/students.js';

const retrieveAllStudents = async () => {
    const studenti = await readAllStudents();
    return studenti;
};

const retriveAllEnrolledStudents = async () => {
    const enrolledStudents = await readEnrolledStudents();
    return enrolledStudents;
}

export {
    retrieveAllStudents, retriveAllEnrolledStudents
};
