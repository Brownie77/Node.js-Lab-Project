import Database from '../database.js'
import RedisDatabase from '../redisdb.js'
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
        // await Database.getAndDeleteFirstFromQueue();
        // const isNextPatient =  await Database.getCurrentInQueue();
        await RedisDatabase.getAndDeleteFirstFromQueue();
        const isNextPatient =  await RedisDatabase.getCurrentInQueue();
        return isNextPatient;
    }
}


export default new QueueService();