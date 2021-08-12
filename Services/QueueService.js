import Database from '../database.js'
class QueueService {

    async deleteFirstFromQueue() {
        const deletedFirst = await Database.deleteFirstFromQueue();
        return deletedFirst;
    }

    async getCurrentInQueue() {
        const currentInQueue = await Database.getCurrentInQueue();
        return currentInQueue;
    }
}


export default new QueueService();