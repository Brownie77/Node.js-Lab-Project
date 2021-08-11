import Service from './Service.js'
class Controller {
    async createPatient(req, res) {
       const newPatient = await Service.createPatient(req.body.name)
       res.json(newPatient)
    }

    async createResolution(req, res) {
        const newResolution = await Service.createResolution(req.body.resolution);
        res.json(newResolution);
    }

    async getAllPatients(req, res) {
        const allPatients = await Service.getAllPatients();
        res.json(allPatients);
    }

    async getResolution(req, res) {
        const resolution = await Service.getResolution(req.body.name);
        res.json(resolution);

    }

    async deleteFirstFromQueue(req, res, next) {
        const deletedFirst = await Service.deleteFirstFromQueue();
        console.log(deletedFirst);
        next();
    }

    async getCurrentInQueue(req, res, next) {
        const currentInQueue = await Service.getCurrentInQueue();
        res.json(currentInQueue);
    }

    async deleteResolution(req, res) {
        const deletedResolution = await Service.deleteResolution(req.params.key);
        res.json(deletedResolution);

    }

    async nextPatientInQueue(req, res, next) { 
        await Service.deleteFirstFromQueue();
        const currentInQueue = await Service.getCurrentInQueue();
        res.json(currentInQueue);    }
}


export default new Controller();