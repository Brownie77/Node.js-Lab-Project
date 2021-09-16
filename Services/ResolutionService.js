import Database from '../dbDriver.js';
class ResolutionService {
  async createResolution(resolutionText, lifetime, token) {
    return Database.createResolution(resolutionText, lifetime, token);
  }

  async getResolution(name, offset) {
    return Database.getResolution(name, offset);
  }
  async deleteResolution(id) {
    return Database.deleteResolution(id);
  }
}

export default new ResolutionService();
