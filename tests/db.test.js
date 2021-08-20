import redisDB from '../redisdb.js'
import dbDriver from '../dbDriver.js';
const myDB = new redisDB()
import PatientService from '../Services/PatientService.js'
import app from './serverTest.js';
import request from 'supertest';

test("create patient from service", async () => {
  const createPatient = await PatientService.createPatient('ivan')
  expect(createPatient).toBe('ivan');
});

test("create patient", async () => {
    const createPatient = await myDB.createPatient('ivan', 10)
    expect(createPatient).toBe('ivan');
  });


  // describe('gae_flex_mailjet_send_message gae_flex_mailjet_config', () => {
  //   console.log(request)
  //   describe('GET /', () => {
  //    it('should get 200', (done) => {
  //     request(app).get('/api/patient').expect(200, done);
  //    });
  //   });
  //  });