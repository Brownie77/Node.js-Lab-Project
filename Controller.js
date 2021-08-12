import Service from './Service.js'
import createPatientSchema from './schema/createPatientSchema.js'
import createResolutionSchema from './schema/createResolutionSchema.js'
import validate from './utilities/validate.js'


class Controller {
    async createPatient(req, res) {
        const valid = validate(req.body, createPatientSchema)
        if (valid) {
            const newPatient = await Service.createPatient(req.body.name)
            res.json(newPatient);
        } else {
            res.status(400).send('Patient name must contain 2 or more characters')
        }
    }
    async createResolution(req, res) {
        const valid = validate(req.body, createResolutionSchema)
        if (valid) {
            const newResolution = await Service.createResolution(req.body.resolution);
            res.json(newResolution);
        } else {
            res.status(400).send('The resolution must be at least 10 characters and no more than 400 characters.')

        }
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
        res.json(currentInQueue);
    }
}


export default new Controller();