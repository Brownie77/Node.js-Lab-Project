import dbDriver from '../dbDriver.js';
const Database = dbDriver
class PatientService {
    async createPatient(name) {
       const createdPatient = await Database.createPatient(name);
        return createdPatient;
    }

    async getAllPatients() {
        const allPatients = await Database.getAllPatients();
        console.log(allPatients)
        return allPatients;

    }
}


export default new PatientService();