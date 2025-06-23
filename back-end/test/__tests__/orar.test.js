// test/__tests__/orar.test.js
import request from 'supertest';
import app from '../../index.js';
import { initializeDatabase } from '../../src/persistence/db.js';

beforeAll(async () => {
  await initializeDatabase(); 
});

describe('/orar', () => { 
  it('ar trebui să returneze o listă cu activități', async () => {
    const res = await request(app).get('/orar');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0); 
  });
});
