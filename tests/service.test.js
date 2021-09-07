import PatientService from '../Services/PatientService.js'
import QueueService from '../Services/QueueService.js'
import ResolutionService from '../Services/ResolutionService.js'
const patientService = new PatientService()
import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;
describe('Testing Service/createPatientAndReturnCurrentPatient', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  test("create first patient from service and return first patient at queue", async () => {
    const currentPatient = await patientService.createPatientAndReturnCurrentPatient('ivan')
    expect(currentPatient).toBe('ivan');
    jest.setTimeout(10000);

  });

  test("create second patient from service and return first patient at queue", async () => {
    const currentPatient = await patientService.createPatientAndReturnCurrentPatient('Serg')
    expect(currentPatient).toBe('ivan');
    jest.setTimeout(10000);
  });
})


describe('Testing Service/getCurrentInQueue', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Serg')
    await patientService.createPatientAndReturnCurrentPatient('Ivan')
    await patientService.createPatientAndReturnCurrentPatient('Sergey')
  });
  test("created three new patient and return first patient in queue", async () => {
    const currentPatientInQueue = await QueueService.getCurrentInQueue('Serg')
    expect(currentPatientInQueue).toBe('Serg');
    jest.setTimeout(10000);

  })
})

describe('Testing Service/nextPatientInQueue', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Serg')
    await patientService.createPatientAndReturnCurrentPatient('Ivan')
    await patientService.createPatientAndReturnCurrentPatient('Sergey')
  });
  test("created three new patient, delete current patient from queue and return new current patient in queue", async () => {
    const currentPatientInQueue = await QueueService.nextPatientInQueue()
    expect(currentPatientInQueue).toBe('Ivan');
    jest.setTimeout(10000);

  })
})

describe('Testing Service/deleteFirstFromQueue', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Serg')
    await patientService.createPatientAndReturnCurrentPatient('Ivan')
    await patientService.createPatientAndReturnCurrentPatient('Sergey')
  });
  test("created three new patient, delete current patient from queue and return the last one", async () => {
    const currentPatientInQueue = await QueueService.deleteFirstFromQueue()
    expect(currentPatientInQueue).toBe('Serg');
    jest.setTimeout(10000);

  })
})


describe('Testing Service/createResolution', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Serg')
  });
  test("created, delete current patient from queue and return the last one", async () => {
    const newResolution = await ResolutionService.createResolution('new resolution for Serg', 10)
    const whoseResolution = await QueueService.getCurrentInQueue();
    expect(whoseResolution).toBe('Serg')
    expect(newResolution).toBe('new resolution for Serg');
    jest.setTimeout(10000);

  })
})


describe('Testing Service/getResolution', () => {
  afterAll(async () => {
    patientService.clearDatabase();
  });
  beforeAll(async () => {
    await patientService.createPatientAndReturnCurrentPatient('Serg');
    await ResolutionService.createResolution('new resolution for Serg', 10)
  });
  test("create patient 'Serg', add new resolution for patient and return new resolution", async () => {
    const returnedResolution = await ResolutionService.getResolution('Serg')
    expect(returnedResolution).toBe('new resolution for Serg')
    jest.setTimeout(10000);
  })
})


