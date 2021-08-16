import Database from '../database.js'
import RedisDatabase from '../redisdb.js'
class PatientService {
    async createPatient(name) {
       const createdPatient = await RedisDatabase.createPatient(name);
    //    const createdPatient = await Database.createPatient(name);

        return createdPatient;
    }

    async getAllPatients() {
        const allPatients = await RedisDatabase.getAllPatients();
        // const allPatients = await Database.getAllPatients();

        return allPatients;

    }

    async searchPatientIndex(name) {
        const patientIndex = await Database.searchPatientIndex(name);
        return patientIndex;
    }
}


export default new PatientService();