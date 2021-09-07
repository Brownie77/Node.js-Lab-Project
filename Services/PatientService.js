import Database from '../dbDriver.js';
class PatientService {
    async createPatientAndReturnCurrentPatient(name, user_id) {
       const returnedPatient = await Database.createPatientAndReturnCurrentPatient(name, user_id);
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

    async registrationNewUser(payload) {
        const newPatient = await Database.registrationNewUser(payload);
        return newPatient;
    }

    async userLogin(payload) {
        const usersToken = await Database.userLogin(payload);
        return usersToken;
    }
}

export default new PatientService();

