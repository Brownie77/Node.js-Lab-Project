import ResolutionService from '../Services/ResolutionService.js';
import createResolutionSchema from '../schema/createResolutionSchema.js';
import validate from '../utilities/validate.js';
import url from 'url';

class ResolutionController {
  async createResolution(req, res) {
    const queryObject = url.parse(req.url, true).query;
    const valid = validate(req.body, createResolutionSchema);
    if (valid) {
      const token = req.cookies.access_token;
      await ResolutionService.createResolution(
        req.body.resolution,
        queryObject.expire,
        token,
      );
      res.status(201).end();
    } else {
      res
        .status(400)
        .send(
          'The resolution must be at least 10 characters and no more than 400 characters.',
        );
    }
  }
  async getResolutionByName(req, res, next) {
    try {
      const queryObject = url.parse(req.url, true).query;
      const resolution = await ResolutionService.getResolution(
        req.params.name,
        queryObject.offset,
      );
      res.json(resolution);
    } catch (error) {
      next(error);
    }
  }

  async deleteResolution(req, res, next) {
    try {
      await ResolutionService.deleteResolution(req.params.id);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new ResolutionController();
