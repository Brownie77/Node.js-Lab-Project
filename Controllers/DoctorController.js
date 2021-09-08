import DoctorService from '../Services/DoctorService.js';

class DoctorController {
  async doctorLogin(req, res, next) {
    try {
      const accessToken = await DoctorService.doctorLogin(req.body);
      return res
        .status(200)
        .cookie('access_token', accessToken, { httpOnly: true })
        .end();
    } catch (error) {
      next(error);
    }
  }
}

export default new DoctorController();
