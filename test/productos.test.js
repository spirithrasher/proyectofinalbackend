import request from 'supertest';
import app from '../index.js'; // Asegurate que exportás la app de Express en app.js
import fs from 'fs';
import path from 'path';

describe('POST /products', () => {
  it('debería subir un producto correctamente', async () => {
    const testImagePath = path.resolve('tests/test-image.jpg');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJwZWRyb0BnbWFpbC5jb20iLCJpYXQiOjE3NDkzMzcxMDksImV4cCI6MTc0OTM0MDcwOX0.BxyixVqBHWzX9WaETNerPeVFwnOzJMka6TNeUYDTV08'; // Puedes mockear uno si es JWT

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .field('nombre', 'Producto Test')
      .field('precio', '12345')
      .field('descripcion', 'Este es un producto de prueba')
      .field('seller_id', 1)
      .field('categoria_id', 2)
      .attach('imagen', testImagePath);

    expect(response.statusCode).toBe(201);
  });

  it('debería fallar si falta algún campo obligatorio', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJwZWRyb0BnbWFpbC5jb20iLCJpYXQiOjE3NDkzMzcxMDksImV4cCI6MTc0OTM0MDcwOX0.BxyixVqBHWzX9WaETNerPeVFwnOzJMka6TNeUYDTV08';

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .field('nombre', 'a')
      .field('precio', '1')
      .field('descripcion', 'a')
      .field('seller_id', '1')
      .field('categoria_id', '1');

    expect(response.statusCode).toBe(400);
  });
});
