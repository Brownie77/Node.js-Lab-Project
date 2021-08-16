import redis from 'redis';
import {
    promisify
} from 'util';
const db = redis.createClient();
const hgetAllAsync = promisify(db.HGETALL).bind(db);
const lrangeAsync = promisify(db.lrange).bind(db);
db.on("error", function (error) {
    console.error(error);
});
db.FLUSHALL();


class RedisDatabase {
    async getAnddeleteFirstFromQueue() {
        db.lpop('queue',function (err, reply) {
            console.log(err, reply)
        });

    }
    async addToQueue(patientId) {
        db.rpush('queue', patientId);
    }
    async getQueue() {
       const queue = await lrangeAsync('queue', 0, -1);
        console.log(queue)
        return queue;
    }
    async createPatient(patientId) {
        db.hmset(patientId, {
            'name': patientId,
            'resolution': 'Current version of resolution is empty',
            'creationDate': new Date()
        }, function (err, reply) {
            console.log(err, reply);
        });
        const newPatient = hgetAllAsync(patientId);
        return newPatient;
    }

    async getAllPatients() {
        db.HGETALL('Kirill', function (err, object) {
            console.log(object);
        });
    }
}

//   createPatient(patientId) {
//     queue.push(patientId);
//     patientData.push({
//         name: patientId,
//         resolution: "Current version of resolution is empty",
//         creationDate: new Date()
//     })
//     return this.getCurrentInQueue();
// }


export default new RedisDatabase;