import Service from '../Service.js'
class QueueController {
    async getCurrentInQueue(req, res, next) {
        const currentInQueue = await Service.getCurrentInQueue();
        res.json(currentInQueue);
    }

    async nextPatientInQueue(req, res, next) {
        await Service.deleteFirstFromQueue();
        const currentInQueue = await Service.getCurrentInQueue();
        res.json(currentInQueue);
    }
}

export default new QueueController;
