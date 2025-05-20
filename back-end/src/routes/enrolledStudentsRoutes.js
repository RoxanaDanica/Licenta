import express from 'express';
import { enrollStudent } from '../services/enrolledStudentsService.js';

const enrolledStudents = express.Router();

enrolledStudents.post('/', async (req, res) => {
    const { id_student, id_slot } = req.body;

    const students = await enrollStudent(id_student, id_slot);
    console.log('in routes ====>', students)
    res.send(students);

}); 

export default enrolledStudents;