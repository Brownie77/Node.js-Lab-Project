import Database from '../dbDriver.js';
class ResolutionService {
    async createResolution(resolutionText) {
        const createdResolution = await Database.createResolution(resolutionText);
        return createdResolution;
    }

    async getResolution(name) {
        
        const resolution = await Database.getResolution(name);
        return resolution;

    }
    async deleteResolution(name) {
        const deleteResolution = await Database.deleteResolution(name);
        return deleteResolution;

    }
}


export default new ResolutionService();