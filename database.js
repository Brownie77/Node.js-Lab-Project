let queue = [];
let patientData = {};
import Api404Error from './errors/api404Error.js';


export default class {
    clearDatabase() {
        queue = [];
        patientData = {};
    }
    checkResolutionLifetime(patientId) {
        const resolutionLifetime = parseInt(patientData[patientId].resolutionLifetime) * 1000 + Date.parse(patientData[patientId].resolutionCreationDate)
        if (resolutionLifetime < Date.now()) {
            delete patientData[patientId].resolution;
        }
    }


    createPatientAndReturnCurrentPatient(patientId) {
        queue.push(patientId);
        patientData[`${patientId}`] = {
            name: patientId,
            creationDate: new Date(),
            resolutionLifetime: null,
            resolutionCreationDate: null,
        }
        return this.getCurrentInQueue();
    }

    createPatient(patientId) {
        queue.push(patientId);
        patientData[`${patientId}`] = {
            name: patientId,
            creationDate: new Date(),
            resolutionLifetime: null,
            resolutionCreationDate: null,
        }
        return patientData[`${patientId}`];
    }


    getAllPatients() {
        return Object.values(patientData);
    }

    createResolution(resolutionText, lifetime) {
        const currentInQueue = queue[0]
        patientData[currentInQueue].resolution = resolutionText;
        patientData[currentInQueue].resolutionLifetime = lifetime;
        patientData[currentInQueue].resolutionCreationDate = new Date();
        return patientData[currentInQueue].resolution

    }

    getResolution(patientId) {
        this.checkResolutionLifetime(patientId)
        if (patientData[patientId].resolution === undefined) {
            throw new Api404Error(`Resolution was deleted or not creation yet`);
        }
        return patientData[patientId].resolution;

    }

    getAndDeleteFirstFromQueue() {
        const currentPatient = queue[0];
        queue.shift();
        return currentPatient;
    }

    getCurrentInQueue() {
        if (queue.length === 0) {
            return null;
        }
        const currentInQueue = queue[0];
        return currentInQueue;
    }

    deleteResolution(patientId) {
        const deletedResolution = patientData[patientId].resolution;
        delete patientData[patientId].resolution;
        return deletedResolution;
    }
}