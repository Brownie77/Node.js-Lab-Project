import dbDriver from '../dbDriver.js';
class PatientService {
    constructor(database) {
        this.database = database;
    }
    async createPatientAndReturnCurrentPatient(name) {
       const returnedPatient = await this.database.createPatientAndReturnCurrentPatient(name);
       console.log(`Now the returned patient is ${returnedPatient}`)

        return returnedPatient;
    }

    async getAllPatients() {
        const allPatients = await this.database.getAllPatients();
        console.log(allPatients)
        return allPatients;

    }
}


export default new PatientService(dbDriver);