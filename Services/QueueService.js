import Database from '../dbDriver.js';
if (Database === undefined) {
  console.log('Database is not available');
}
class QueueService {
  async deleteFirstFromQueue() {
    const deletedFirst = await Database.getAndDeleteFirstFromQueue();
    return deletedFirst;
  }

  async getCurrentInQueue(token) {
    const currentInQueue = await Database.getCurrentInQueue(token);
    return currentInQueue;
  }

  async nextPatientInQueue(token) {
    await Database.getAndDeleteFirstFromQueue(token);
    const isNextPatient = await Database.getCurrentInQueue(token);
    return isNextPatient;
  }

  async fetchRoles() {
    return Database.fetchRoles();
  }

  async fetchDoctors(role) {
    return Database.fetchDoctors(role);
  }
}

export default new QueueService();
