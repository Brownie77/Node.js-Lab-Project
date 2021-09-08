import Database from '../dbDriver.js';
class PatientService {
  async createPatientAndReturnCurrentPatient(name, user_id, role, doctor) {
    const returnedPatient = await Database.createPatientAndReturnCurrentPatient(
      name,
      user_id,
      role,
      doctor,
    );
    return returnedPatient;
  }

  async getAllPatients() {
    const allPatients = await Database.getAllPatients();
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

  async doctorLogin(payload) {
    const doctorToken = await Database.doctorLogin(payload);
    return doctorToken;
  }
}

export default new PatientService();
