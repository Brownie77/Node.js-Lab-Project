import QueueService from '../Services/QueueService.js'
class QueueController {
    async getCurrentInQueue(req, res, next) {
        const currentInQueue = await QueueService.getCurrentInQueue();
        res.json(currentInQueue);
    }

    async nextPatientInQueue(req, res, next) {
        await QueueService.deleteFirstFromQueue();
        const nextPatient = await QueueService.getCurrentInQueue();
        res.json(nextPatient);
    }
}

export default new QueueController;
