import PatientService from '../Services/PatientService.js'
import createPatientSchema from '../schema/createPatientSchema.js'
import validate from '../utilities/validate.js'
import dbDriver from '../dbDriver.js';
const patientService = new PatientService(dbDriver);
class PatientController {
    async   createPatientAndReturnCurrentPatient(req, res) {
        const valid = validate(req.body, createPatientSchema)
        if (valid) {
            const currentPatientInQueue = await patientService.createPatientAndReturnCurrentPatient(req.body.name)
            res.json(currentPatientInQueue);
        } else {
            res.status(400).send('Patient name must contain 2 or more characters')
        }
    }

    async getAllPatients(req, res) {
        const allPatients = await patientService.getAllPatients();
        res.json(allPatients);
    }
}


export default new PatientController();
