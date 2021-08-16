import Database from '../database.js';
import RedisDatabase from '../redisdb.js'
import PatientService from './PatientService.js'
class ResolutionService {
    async createResolution(resolutionText) {
        // const createdResolution = await Database.createResolution(resolutionText);
        const createdResolution = await RedisDatabase.createResolution(resolutionText);
        return createdResolution;
    }

    async getResolution(name) {
        // RedisDatabase требует name, а не индекс
        const patientIndex  = await PatientService.searchPatientIndex(name);
        // const resolution = await Database.getResolution(patientIndex);
        const resolution = await RedisDatabase.getResolution(name);
        return resolution;

    }
    async deleteResolution(name) {
        // RedisDatabase требует name, а не индекс
        const patientIndex  = await PatientService.searchPatientIndex(name);
        // const deleteResolution = await Database.deleteResolution(patientIndex);
        const deleteResolution = await RedisDatabase.deleteResolution(name);
        return deleteResolution;

    }
}


export default new ResolutionService();