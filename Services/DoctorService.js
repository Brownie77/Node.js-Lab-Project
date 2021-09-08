import Database from '../dbDriver.js';

class DoctorService {
  async doctorLogin(payload) {
    return Database.doctorLogin(payload);
  }
}

export default new DoctorService();
