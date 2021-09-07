import PatientService from '../Services/PatientService.js'
import QueueService from '../Services/QueueService.js'
import ResolutionService from '../Services/ResolutionService.js'
import dbDriver from '../dbDriver.js'
const patientService =  new PatientService(dbDriver);
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;



describe('Testing Service/createPatientAndReturnCurrentPatient', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  test("create first patient from service and return first patient at queue", async () => {
    const currentPatient = await patientService.createPatientAndReturnCurrentPatient('Kirill',"ca60dc10-1c40-44d6-a856-f272ea41d8da")
    expect(currentPatient).toBe('Kirill');
    // jest.setTimeout(10000);

  });

  test("create second patient from service and return first patient at queue", async () => {
    const currentPatient = await patientService.createPatientAndReturnCurrentPatient('Petr', "ca60dc10-1c40-44d6-a856-f272ea41d8da")
    expect(currentPatient).toBe('Kirill');
    // jest.setTimeout(10000);
  });
})


describe('Testing Service/getCurrentInQueue', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Alex', "ca60dc10-1c40-44d6-a856-f272ea41d8da")
    await patientService.createPatientAndReturnCurrentPatient('Dmitriy', "ca60dc10-1c40-44d6-a856-f272ea41d8da")
  });
  test("created three new patient and return  current patient in queue", async () => {
    const currentPatientInQueue  = await QueueService.getCurrentInQueue()
    expect(currentPatientInQueue).toBe('Alex');
    jest.setTimeout(10000);

  })
})

// describe('Testing Service/nextPatientInQueue', () => {
//   afterAll(async () => {
//     patientService.clearDatabase();
//   });
//   beforeAll(async () => {
//     await patientService.createPatientAndReturnCurrentPatient('Serg', "3d145f08-c06f-4bec-8e35-7416d529caf4")
//     await patientService.createPatientAndReturnCurrentPatient('Ivan', "53d145f08-c06f-4bec-8e35-7416d529caf4")
//     await patientService.createPatientAndReturnCurrentPatient('Sergey', "53d145f08-c06f-4bec-8e35-7416d529caf4")
//   });
//   test("created three new patient, delete current patient from queue and return new current patient in queue", async () => {
//     const currentPatientInQueue = await QueueService.nextPatientInQueue()
//     expect(currentPatientInQueue).toBe('Ivan');
//     jest.setTimeout(10000);

//   })
// })

// describe('Testing Service/deleteFirstFromQueue', () => {
//   afterAll(async () => {
//     patientService.clearDatabase();
//   });
//   beforeAll(async () => {
//     await patientService.createPatientAndReturnCurrentPatient('Serg', "3d145f08-c06f-4bec-8e35-7416d529caf4")
//     await patientService.createPatientAndReturnCurrentPatient('Ivan', "53d145f08-c06f-4bec-8e35-7416d529caf4")
//     await patientService.createPatientAndReturnCurrentPatient('Sergey', "53d145f08-c06f-4bec-8e35-7416d529caf4")
//   });
//   test("created three new patient, delete current patient from queue and return the last one", async () => {
//     const currentPatientInQueue = await QueueService.deleteFirstFromQueue()
//     expect(currentPatientInQueue).toBe('Serg');
//     jest.setTimeout(10000);

//   })
// })


// describe('Testing Service/createResolution', () => {
//   afterAll(async () => {
//     patientService.clearDatabase();
//   });
//   beforeAll(async () => {
//     await patientService.createPatientAndReturnCurrentPatient('Serg', "53d145f08-c06f-4bec-8e35-7416d529caf4")
//   });
//   test("created, delete current patient from queue and return the last one", async () => {
//     const newResolution = await ResolutionService.createResolution('new resolution for Serg', 10)
//     const whoseResolution = await QueueService.getCurrentInQueue();
//     expect(whoseResolution).toBe('Serg')
//     expect(newResolution).toBe('new resolution for Serg');
//     jest.setTimeout(10000);

//   })
// })


// describe('Testing Service/getResolution', () => {
//   afterAll(async () => {
//     patientService.clearDatabase();
//   });
//   beforeAll(async () => {
//     await patientService.createPatientAndReturnCurrentPatient('Serg', "53d145f08-c06f-4bec-8e35-7416d529caf4");
//     await ResolutionService.createResolution('new resolution for Serg', 10)
//   });
//   test("create patient 'Serg', add new resolution for patient and return new resolution", async () => {
//     const returnedResolution = await ResolutionService.getResolution('Serg')
//     expect(returnedResolution).toBe('new resolution for Serg')
//     jest.setTimeout(10000);
//   })
// })