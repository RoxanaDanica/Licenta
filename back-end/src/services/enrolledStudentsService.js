import { enrollStudentInCourse, isStudentEnrolled, hasReachedMaxEnrollments, isMaxSlotsReached, retrieveEnrolledStudentsBySlot } from "../persistence/enrolledStudents.js";

const enrollStudent = async (id_student, id_slot) => {
    if(await isMaxSlotsReached(id_slot) == true) {  
        throw Error("Nu mai sunt locuri disponibile."); 
    } else if(await hasReachedMaxEnrollments(id_student) == true) {  
        throw Error("Maxim o înscriere permisa.");
    } else if( await  isStudentEnrolled(id_student, id_slot) == true) {
        throw Error("Deja inrolat.");
    } else {
        const enrolledStudent = await enrollStudentInCourse(id_student, id_slot);
        return enrolledStudent;
    }
}  

const getEnrolledStudentsBySlot = async (id_slot) => {
    return await retrieveEnrolledStudentsBySlot(id_slot);
};
  
export {  enrollStudent, getEnrolledStudentsBySlot };