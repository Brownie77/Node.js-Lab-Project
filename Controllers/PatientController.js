import PatientService from '../Services/PatientService.js'
import createPatientSchema from '../schema/createPatientSchema.js'
import validate from '../utilities/validate.js'


class PatientController {
    async   createPatientAndReturnCurrentPatient(req, res) {
        const valid = validate(req.body, createPatientSchema)
        if (valid) {
            const currentPatientInQueue = await PatientService.createPatientAndReturnCurrentPatient(req.body.name)
            res.json(currentPatientInQueue);
        } else {
            res.status(400).send('Patient name must contain 2 or more characters')
        }
    }

    async getAllPatients(req, res) {
        const allPatients = await PatientService.getAllPatients();
        res.json(allPatients);
    }
}


export default new PatientController();