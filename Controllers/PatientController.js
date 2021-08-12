import Service from '../Service.js'
import createPatientSchema from '../schema/createPatientSchema.js'
import validate from '../utilities/validate.js'


class PatientController {
    async createPatient(req, res) {
        const valid = validate(req.body, createPatientSchema)
        if (valid) {
            const newPatient = await Service.createPatient(req.body.name)
            res.json(newPatient);
        } else {
            res.status(400).send('Patient name must contain 2 or more characters')
        }
    }

    async getAllPatients(req, res) {
        const allPatients = await Service.getAllPatients();
        res.json(allPatients);
    }
}


export default new PatientController();