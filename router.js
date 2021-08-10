import Router from "express";
import Controller from './Controller.js'

const router = new Router();


router.post('/patient', Controller.createPatient);
router.get('/resolution', Controller.getResolution);
router.get('/patient/next', [Controller.deleteFirstFromQueue, Controller.getCurrentInQueue]);
router.post('/resolution', Controller.createResolution);
router.get('/patient/all', Controller.getAllPatients);

router.delete('/resolution', (req, res) => {
    res.send('We delete resolution')
});


export default router;