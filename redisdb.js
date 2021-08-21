import redis from 'redis';
import redisScan from 'node-redis-scan';
import Api404Error from './errors/api404Error.js';
import {
    promisify
} from 'util';
const db = redis.createClient();
const scanner = new redisScan(db);
const hgetAllAsync = promisify(db.HGETALL).bind(db);
const hmsetAsync = promisify(db.HMSET).bind(db);
const hgetAsync = promisify(db.HGET).bind(db);
const hdelAsync = promisify(db.hdel).bind(db);
const lrangeAsync = promisify(db.lrange).bind(db);
db.on("error", function (error) {
    console.error(error);
});
db.FLUSHALL();
// console.log(process.env.NODE_ENV)

export default class {

    async checkExpires(patientId) {
        db.hgetall(patientId, function (err, reply) {
            if (reply === null) {
                return null;
            }
            if (parseInt(reply.resolutionLifetime) <= Date.now()) {
                hdelAsync(patientId, 'resolution');
            }
        });
        // const searchedPatient = await hgetAllAsync(patientId);
        // return searchedPatient;
    }
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
            'creationDate': new Date(),
            'resolutionLifetime': 0,

        });
        await this.addToQueue(patientId);
        const newPatient = await hgetAllAsync(patientId);
        return newPatient;
    }
    async createPatientAndReturnCurrentPatient(patientId) {
        hmsetAsync(patientId, {
            'name': patientId,
            'resolution': 'Current version of resolution is empty',
            'creationDate': new Date(),
            'resolutionLifetime': 0,

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
            await this.checkExpires(patientId);
            const searchedPatient = await this.getPatient(patientId);
            if(searchedPatient === null) {
                throw new Api404Error(`Patient with id: ${patientId} not found.`);
            }
            console.log(searchedPatient)
            if (searchedPatient && searchedPatient.resolution) {
                return searchedPatient.resolution;
            }
            return null;
        }



    async createResolution(resolutionText, lifetime) {
        console.log(typeof lifetime)
        const expireTime = (lifetime * 1000) + Date.now()
        const currentPatientInQueue = await this.getCurrentInQueue();
        const patientInfoFromDatabase = await this.getPatient(currentPatientInQueue);
        patientInfoFromDatabase.resolution = resolutionText;
        patientInfoFromDatabase.resolutionLifetime = expireTime;
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