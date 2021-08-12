import QueueService from '../Services/QueueService.js'
class QueueController {
    async getCurrentInQueue(req, res, next) {
        const currentInQueue = await QueueService.getCurrentInQueue();
        res.json(currentInQueue);
    }

    async nextPatientInQueue(req, res, next) {
        await Service.deleteFirstFromQueue();
        const currentInQueue = await QueueService.getCurrentInQueue();
        res.json(currentInQueue);
    }
}

export default new QueueController;
