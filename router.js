import Router from 'express';
import PatientController from './Controllers/PatientController.js';
import DoctorController from './Controllers/DoctorController.js';
import ResolutionController from './Controllers/ResolutionController.js';
import QueueController from './Controllers/QueueController.js';
import errorHandler from './errors/errorHandler.js';
const router = new Router();

router.post('/:role/:doctorName/patient', PatientController.createPatient);
router.post('/registration', PatientController.registrationNewUser);
router.post('/login', PatientController.userLogin);
router.get('/:name/resolution', ResolutionController.getResolutionByName);
router.get('/patient/next', QueueController.nextPatientInQueue);
router.get('/patient/current', QueueController.getCurrentInQueue);
router.get('/roles', QueueController.fetchRoles);
router.get('/:role/doctors-list', QueueController.fetchDoctors);
router.post('/resolution', ResolutionController.createResolution);
router.get('/patient/all', PatientController.getAllPatients);
router.delete('/:name/resolutions/:id', ResolutionController.deleteResolution);
router.post('/doctor-login', DoctorController.doctorLogin);
router.use(errorHandler.logError);
router.use(errorHandler.returnError);

export default router;
