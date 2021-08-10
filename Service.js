import Database from './database.js'
class Service {
    async createPatient(name) {
       const createdPatient = await Database.createPatient(name)
        return createdPatient;
    }

    async createResolution(resolutionText) {
        const createdResolution = await Database.createResolution(resolutionText);
        return createdResolution;
    }

    async getAllPatients() {
        const allPatients = await Database.getAllPatients();
        return allPatients;

    }

    async getResolution(name) {
        const patientIndex  = await this.searchPatientIndex(name);
        const resolution = await Database.getResolution(patientIndex);
        return resolution;

    }

    async deleteFirstFromQueue() {
        const deletedFirst = await Database.deleteFirstFromQueue();
        return deletedFirst;
    }

    async getCurrentInQueue() {
        const currentInQueue = await Database.getCurrentInQueue();
        return currentInQueue;
    }

    async searchPatientIndex(name) {
        const patientIndex = await Database.searchPatientIndex(name);
        return patientIndex;
    }
    async deleteResolution(name) {
        const patientIndex  = await this.searchPatientIndex(name);
        const deleteResolution = await Database.deleteResolution(patientIndex);
        return deleteResolution;

    }
}


export default new Service();