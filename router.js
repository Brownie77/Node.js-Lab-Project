import Router from "express";
import PatientController from './Controllers/PatientController.js'
import ResolutionController from './Controllers/ResolutionController.js'
import QueueController from './Controllers/QueueController.js'

const router = new Router();


router.post('/patient', PatientController.createPatient);
router.post('/resolution/get', ResolutionController.getResolution);
router.get('/patient/next', QueueController.nextPatientInQueue);
router.get('/patient/current', QueueController.getCurrentInQueue);
router.post('/resolution', ResolutionController.createResolution);
router.get('/patient/all', PatientController.getAllPatients);
router.delete('/resolution/:key', ResolutionController.deleteResolution);


export default router;