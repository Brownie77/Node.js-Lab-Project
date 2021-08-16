import redis from 'redis';

import {
    promisify
} from 'util';
const db = redis.createClient();
const hgetAllAsync = promisify(db.HGETALL).bind(db);
const hgetAsync = promisify(db.HGET).bind(db);
const lrangeAsync = promisify(db.lrange).bind(db);
db.on("error", function (error) {
    console.error(error);
});
db.FLUSHALL();


class RedisDatabase {
    async getAndDeleteFirstFromQueue() {
        db.lpop('queue', function (err, reply) {
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

    async getCurrentInQueue() {
        const currentPatientInQueue = await lrangeAsync('queue', 0, 0);
        console.log(currentPatientInQueue);
        return currentPatientInQueue;
    }
    async createPatient(patientId) {
        db.hmset('patients', patientId, JSON.stringify({
            'name': patientId,
            'resolution': 'Current version of resolution is empty',
            'creationDate': new Date()
        }), function (err, reply) {
            console.log(err, reply);
        });
        const newPatient = await hgetAsync('patients', patientId);
        return JSON.parse(newPatient);
    }
    async getPatient(patientId) {
        const searchedPatient = await hgetAsync('patients', patientId);
        return JSON.parse(searchedPatient);
    }
    async getAllPatients() {
        const allPatients = await hgetAllAsync('patients');
        return allPatients
    }

    async getResolution(patientId){
        const currentPatient = await this.getPatient(patientId);
        return currentPatient.resolution;
    }

}

export default new RedisDatabase;