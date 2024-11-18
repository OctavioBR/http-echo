import { expect } from '@jest/globals';
import request from 'supertest';
import { app } from './app';

describe('Express Server', () => {
  it('should echo the request details', async () => {
    const response = await request(app)
      .post('/test')
      .set('Accept', 'application/json')
      .send({ key: 'value' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('path', '/test');
    expect(response.body).toHaveProperty('method', 'POST');
    expect(response.body).toHaveProperty('body', JSON.stringify({ key: 'value' }));
    expect(response.body).toHaveProperty('os.hostname');
  });
});
