let queue = [];
let patientData = {};

export default class  {
    createPatient(patientId) {
        queue.push(patientId);
        patientData[`${patientId}`] = { name: patientId,
            resolution: "Current version of resolution is empty",
            creationDate: new Date()}
        return this.getCurrentInQueue();
    }

    getAllPatients(){
        return Object.values(patientData);
    }

    createResolution(resolutionText) {
        const currentInQueue = queue[0]
        patientData[currentInQueue].resolution = resolutionText;
        return patientData[currentInQueue].resolution
    }

     getResolution(patientId) {
        return patientData[patientId].resolution;

    }

    getAndDeleteFirstFromQueue() {
        const currentPatient = queue[0];
        queue.shift();
        return currentPatient;
    }

     getCurrentInQueue() {
         if(queue.length ===0){
             return null;
         }
        const currentInQueue = queue[0];
        return currentInQueue;
    }

    deleteResolution(patientId){
        const deletedResolution = patientData[patientId].resolution;
        patientData[patientId].resolution = "";
        return deletedResolution;
    }
}


