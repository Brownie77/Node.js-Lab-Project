import Router from "express";
import PatientController from './Controllers/PatientController.js'
import ResolutionController from './Controllers/ResolutionController.js'
import QueueController from './Controllers/QueueController.js'
import errorHandler from './errors/errorHandler.js'
const router = new Router();
import auth from './jwt/auth.js'


router.post('/patient', PatientController.createPatientAndReturnCurrentPatient);
router.post('/registration', PatientController.registrationNewUser);
router.post('/login', PatientController.userLogin);
router.post('/resolution/get', ResolutionController.getResolution);
router.get('/patient/next', QueueController.nextPatientInQueue);
router.get('/patient/current', QueueController.getCurrentInQueue);
router.post('/resolution', ResolutionController.createResolution);
router.get('/patient/all', PatientController.getAllPatients);
router.delete('/resolution/:key',  ResolutionController.deleteResolution);
router.use(errorHandler.logError)
router.use(errorHandler.returnError)   

export default router;
