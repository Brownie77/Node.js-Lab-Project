import PatientService from '../Services/PatientService.js'

describe('Testing Service/createPatientAndReturnCurrentPatient', () => {
    test("create first patient from service and return first patient at queue", async () => {
      const currentPatient = await PatientService.createPatientAndReturnCurrentPatient('ivan')
      expect(currentPatient).toBe('ivan');
      jest.setTimeout(5000);
  
    });
  
    test("create second patient from service and return first patient at queue", async () => {
      const currentPatient = await PatientService.createPatientAndReturnCurrentPatient('Serg')
      expect(currentPatient).toBe('ivan');
      jest.setTimeout(5000);
    });
  })


