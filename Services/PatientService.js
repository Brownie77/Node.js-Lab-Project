import dbDriver from '../dbDriver.js';
export default class PatientService {
    constructor(database) {
        this.database = database;
    }
    async createPatientAndReturnCurrentPatient(name) {
       const returnedPatient = await this.database.createPatientAndReturnCurrentPatient(name);
        return returnedPatient;
    }

    async getAllPatients() {
        const allPatients = await this.database.getAllPatients();
        console.log(allPatients)
        return allPatients;

    }

    async clearDatabase() {
        await this.database.clearDatabase();
    }
}


