import Router from "express";
import Controller from './Controller.js'

const router = new Router();


router.post('/patient', Controller.createPatient);
router.post('/resolution/get', Controller.getResolution);
// router.get('/patient/next', [Controller.deleteFirstFromQueue, Controller.getCurrentInQueue]);
router.get('/patient/next', Controller.nextPatientInQueue);
router.post('/resolution', Controller.createResolution);
router.get('/patient/all', Controller.getAllPatients);
router.delete('/resolution:key', Controller.deleteResolution);


export default router;