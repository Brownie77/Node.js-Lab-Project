let queue = [];
let patientData = [];

class Database {
    createPatient(patientId) {
        queue.push(patientId);
        patientData.push({
            name: patientId,
            resolution: "Current version of resolution is empty",
            creationDate: new Date()
        })
        return this.getCurrentInQueue();
    }

    getAllPatients(){
        return patientData;
    }

    searchPatientIndex(name) {
        for (let i = 0; i < patientData.length; i++) {
            if (patientData[i].name === name) {
                return i;
            } 
        }
        return -1;

    }

    createResolution(resolutionText) {
        patientData[0].resolution = resolutionText;
        return patientData[0].resolution;
    }

     getResolution(index) {
        return patientData[index].resolution;

    }

    deleteFirstFromQueue() {
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

    deleteResolution(index){
        console.log(index)
        const deletedResolution = patientData[index].resolution;
        patientData[index].resolution = "";
        return deletedResolution;
    }
}


export default new Database();