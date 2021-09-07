import Database from '../dbDriver.js';
if(Database === undefined) {
    console.log('Database is not available')
}
class QueueService {

    async deleteFirstFromQueue() {
        const deletedFirst = await Database.getAndDeleteFirstFromQueue();
        return deletedFirst;
    }

    async getCurrentInQueue() {
        const currentInQueue = await Database.getCurrentInQueue();
        return currentInQueue;
    }

    async nextPatientInQueue() {
        await Database.getAndDeleteFirstFromQueue();
        const isNextPatient =  await Database.getCurrentInQueue();
        return isNextPatient;
    }
}


export default new QueueService();
