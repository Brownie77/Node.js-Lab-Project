import redis from 'redis';

import {
    promisify
} from 'util';
const db = redis.createClient();
const hgetAllAsync = promisify(db.HGETALL).bind(db);
const hmsetAsync = promisify(db.HMSET).bind(db);
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
        if(currentPatientInQueue.length === 0) {
            return null;
        }
        return currentPatientInQueue[0];
    }
    async createPatient(patientId) {
        hmsetAsync('patients', patientId, JSON.stringify({
            'name': patientId,
            'resolution': 'Current version of resolution is empty',
            'creationDate': new Date()
        }));
        await this.addToQueue(patientId);
        const newPatient = await hgetAsync('patients', patientId);
        return JSON.parse(newPatient);
    }
    async getPatient(patientId) {
        const searchedPatient = await hgetAsync('patients', patientId);
        return JSON.parse(searchedPatient);
    }
    async getAllPatients() {
        const allPatients = await hgetAllAsync('patients');
        console.log(allPatients)
        return allPatients
    }

    async getResolution(patientId){
        const currentPatient = await this.getPatient(patientId);
        return currentPatient.resolution;
    }

    async createResolution(resolutionText) {
        const currentPatientInQueue = await this.getCurrentInQueue();
        const patientInfoFromDatabase = await this.getPatient(currentPatientInQueue);
        patientInfoFromDatabase.resolution = resolutionText;
        hmsetAsync('patients', currentPatientInQueue, JSON.stringify(patientInfoFromDatabase));
        return patientInfoFromDatabase.resolution
    }
    async deleteResolution(patientId) {
        const patientInfoFromDatabase = await this.getPatient(patientId);
        const previousResolution = patientInfoFromDatabase.resolution
        patientInfoFromDatabase.resolution = "";
        hmsetAsync('patients', patientId, JSON.stringify(patientInfoFromDatabase));
        return previousResolution;
    }

}

export default new RedisDatabase;