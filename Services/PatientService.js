// import Database from '../dbDriver.js';
export default class PatientService {
    constructor(database) {
        this.database = database;
    }
    async createPatientAndReturnCurrentPatient(name, user_id) {
       const returnedPatient = await this.database.createPatientAndReturnCurrentPatient(name, user_id);
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

    async registrationNewUser(payload) {
        const newPatient = await this.database.registrationNewUser(payload);
        return newPatient;
    }

    async userLogin(payload) {
        const usersToken = await this.database.userLogin(payload);
        return usersToken;
    }
}

// export default new PatientService(Database);

