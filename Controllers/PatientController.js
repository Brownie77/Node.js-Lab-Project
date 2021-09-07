import PatientService from '../Services/PatientService.js'
import createPatientSchema from '../schema/createPatientSchema.js'
import validate from '../utilities/validate.js'
import dbDriver from '../dbDriver.js';
class PatientController {
    async createPatientAndReturnCurrentPatient(req, res, next) {
        console.log(req.body)
        const valid = validate(req.body, createPatientSchema)
        try {
            if (valid) {
                const currentPatientInQueue = await PatientService.createPatientAndReturnCurrentPatient(req.body.name, req.body.user_id)
                res.json(currentPatientInQueue);
            } else {
                res.status(400).send('Patient name must contain 2 or more characters')
            }
        } catch (error) {
            next(error);
        }

    }

    async getAllPatients(req, res) {
        const allPatients = await PatientService.getAllPatients();
        res.json(allPatients);
    }

    async registrationNewUser(req, res, next) {
        try {
            const token = await PatientService.registrationNewUser(req.body);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false
            });
            res.json({
                token
            });
        } catch (error) {
            next(error);
        }

    }
    async userLogin(req, res, next) {
        try {
            const user = await PatientService.userLogin(req.body);
            res.cookie('jwt', user.token, {
                httpOnly: true,
                secure: false
            });
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}


export default new PatientController();