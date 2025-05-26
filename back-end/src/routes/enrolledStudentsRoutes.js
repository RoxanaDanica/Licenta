import express from 'express';
import { enrollStudent, getEnrolledStudentsBySlot } from '../services/enrolledStudentsService.js';

const enrolledStudents = express.Router(); 

enrolledStudents.post('/', async (req, res) => {
    const { id_student, id_slot } = req.body;

    const enrolledStudent = await enrollStudent(id_student, id_slot);
    // console.log('locuri Ocupate ====>', locuriOcupate)
    res.send(enrolledStudent);

}); 

enrolledStudents.get('/:id_slot', async (req, res) => {
    const { id_slot } = req.params;

    const students = await getEnrolledStudentsBySlot(id_slot);
    res.json(students);

});

export default enrolledStudents;