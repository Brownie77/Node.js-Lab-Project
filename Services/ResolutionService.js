import Database from '../database.js';
import PatientService from './PatientService.js'
class ResolutionService {
    async createResolution(resolutionText) {
        const createdResolution = await Database.createResolution(resolutionText);
        return createdResolution;
    }

    async getResolution(name) {
        const patientIndex  = await PatientService.searchPatientIndex(name);
        const resolution = await Database.getResolution(patientIndex);
        return resolution;

    }
    async deleteResolution(name) {
        const patientIndex  = await PatientService.searchPatientIndex(name);
        const deleteResolution = await Database.deleteResolution(patientIndex);
        return deleteResolution;

    }
}


export default new ResolutionService();