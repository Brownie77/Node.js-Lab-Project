import QueueService from '../Services/QueueService.js';
class QueueController {
  async getCurrentInQueue(req, res, next) {
    try {
      const token = req.cookies.access_token;
      const currentInQueue = await QueueService.getCurrentInQueue(token);
      res.json(currentInQueue);
    } catch (err) {
      next(err);
    }
  }

  async nextPatientInQueue(req, res, next) {
    try {
      const token = req.cookies.access_token;
      const nextPatient = await QueueService.nextPatientInQueue(token);
      res.json(nextPatient);
    } catch (err) {
      next(err);
    }
  }

  fetchRoles = async (req, res, next) => {
    try {
      const rolesList = await QueueService.fetchRoles();
      return res.json(rolesList);
    } catch (err) {
      next(err);
    }
  };

  fetchDoctors = async (req, res, next) => {
    try {
      const role = req.params.role;
      const rolesList = await QueueService.fetchDoctors(role);
      return res.json(rolesList);
    } catch (err) {
      next(err);
    }
  };
}

export default new QueueController();
