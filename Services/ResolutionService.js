import Database from '../database.js';
import RedisDatabase from '../redisdb.js'
import PatientService from './PatientService.js'
class ResolutionService {
    async createResolution(resolutionText) {
        const createdResolution = await Database.createResolution(resolutionText);
        return createdResolution;
    }

    async getResolution(name) {
        // RedisDatabase требует name, а не индекс
        const patientIndex  = await PatientService.searchPatientIndex(name);
        const resolution = await RedisDatabase.getResolution(name);
        return resolution;

    }
    async deleteResolution(name) {
        const patientIndex  = await PatientService.searchPatientIndex(name);
        const deleteResolution = await Database.deleteResolution(patientIndex);
        return deleteResolution;

    }
}


export default new ResolutionService();