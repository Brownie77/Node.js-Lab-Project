import dbDriver from '../dbDriver.js';
console.log(dbDriver)
class PatientService {
    constructor(database) {
        this.database = database;
    }
    async createPatient(name) {
       const createdPatient = await this.database.createPatient(name);
       console.log(createdPatient)
        return createdPatient;
    }

    async getAllPatients() {
        const allPatients = await this.database.getAllPatients();
        console.log(allPatients)
        return allPatients;

    }
}


export default new PatientService(dbDriver);