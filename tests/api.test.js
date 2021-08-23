import app from './serverTest.js';
import supertest from 'supertest';
const request = supertest(app)


describe('POST /patient', () => {
  it('should get 200 and return current patient from queue', async () => {
    const response = await request.post('/api/patient').send({
      name: "Kirs"
    }).set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Kirs')
  })

});


describe('GET /patient/current', () => {
  it('gets the current patient fron queue', async () => {
    const response = await request.get('/api/patient/current')
    expect(response.status).toBe(200)
    expect(response.body).toBe('Kirs')
  })
});



