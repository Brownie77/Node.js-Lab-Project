import redis from 'redis';
import redisScan from 'node-redis-scan';

import {
    promisify
} from 'util';
const db = redis.createClient();
const scanner = new redisScan(db);
const hgetAllAsync = promisify(db.HGETALL).bind(db);
const hmsetAsync = promisify(db.HMSET).bind(db);
const hgetAsync = promisify(db.HGET).bind(db);
const lrangeAsync = promisify(db.lrange).bind(db);
db.on("error", function (error) {
    console.error(error);
});
db.FLUSHALL();
// console.log(process.env.NODE_ENV)

export default class  {
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
        if (currentPatientInQueue.length === 0) {
            return null;
        }
        return currentPatientInQueue[0];
    }
    async createPatient(patientId) {
        hmsetAsync(patientId, {
            'name': patientId,
            'resolution': 'Current version of resolution is empty',
            'creationDate': new Date()
        });
        await this.addToQueue(patientId);
        const newPatient = await hgetAllAsync(patientId);
        const currentPatient = await this.getCurrentInQueue();
        return currentPatient;
    }
    async getPatient(patientId) {
        const searchedPatient = await hgetAllAsync(patientId);
        return searchedPatient;
    }
    async getAllPatients() {
        scanner.scan('*', {
            type: "hash"
        }, (err, matchingKeys) => {
            if (err) throw (err);
            console.log(matchingKeys)
        })
    }

    async getResolution(patientId) {
        const currentPatient = await this.getPatient(patientId);
        return currentPatient.resolution;
    }

    async createResolution(resolutionText) {
        const currentPatientInQueue = await this.getCurrentInQueue();
        const patientInfoFromDatabase = await this.getPatient(currentPatientInQueue);
        console.log(patientInfoFromDatabase)
        patientInfoFromDatabase.resolution = resolutionText;
        hmsetAsync(currentPatientInQueue, patientInfoFromDatabase);
        return patientInfoFromDatabase.resolution
    }
    async deleteResolution(patientId) {
        const patientInfoFromDatabase = await this.getPatient(patientId);
        const previousResolution = patientInfoFromDatabase.resolution
        patientInfoFromDatabase.resolution = "";
        hmsetAsync(patientId, patientInfoFromDatabase);
        return previousResolution;
    }

}
