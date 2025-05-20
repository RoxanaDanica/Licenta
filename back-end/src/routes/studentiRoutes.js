import express from 'express';
import { retrieveAllStudents, retriveAllEnrolledStudents } from '../services/studentsService.js';

const studentiRouter = express.Router();

studentiRouter.get('/', async (_, res) => {
    const studenti = await retrieveAllStudents();
    res.send(studenti);
});

studentiRouter.get('/inscrisi', async(_, res) => {
    const enrolledStudents = await retriveAllEnrolledStudents();
    res.send(enrolledStudents);
})

export default studentiRouter;