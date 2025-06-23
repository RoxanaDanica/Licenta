
// test/__tests__/enrolled.test.js
import request from 'supertest';
import app from '../../index.js';
import { initializeDatabase } from '../../src/persistence/db.js';

beforeAll(async () => {
  await initializeDatabase(); 
});


describe('/inscriere', () => {

  it('inscriere/5', async () => {
    const payload = {
      id_student: 5, 
      id_slot: 90
    };
  
    const res = await request(app).post('/inscriere').send(payload);
  
    expect(res.statusCode).toBe(500);
    expect(res.body.error || res.text).toMatch(/Deja inrolat/);
  });
  


  it('inscriere/2', async () => {
    const payload = {
      id_student: 2,
      id_slot: 90
    };
  
    await request(app).post('/inscriere').send(payload); 
   
    const res = await request(app).post('/inscriere').send(payload);
  
    expect(res.statusCode).toBe(500); 
    expect(res.body.error || res.text).toMatch(/Deja inrolat/);
  });
  
  
});
