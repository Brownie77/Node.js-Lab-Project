import Database from '../dbDriver.js';
export default class PatientService {
    async createPatientAndReturnCurrentPatient(name) {
       const returnedPatient = await Database.createPatientAndReturnCurrentPatient(name);
        return returnedPatient;
    }

    async getAllPatients() {
        const allPatients = await Database.getAllPatients();
        console.log(allPatients)
        return allPatients;

    }

    async clearDatabase() {
        await Database.clearDatabase();
    }
}


