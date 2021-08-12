import ResolutionService from '../Services/ResolutionService.js'
import createResolutionSchema from '../schema/createResolutionSchema.js'
import validate from '../utilities/validate.js'

class ResolutionController {
    async createResolution(req, res) {
        const valid = validate(req.body, createResolutionSchema)
        if (valid) {
            const newResolution = await ResolutionService.createResolution(req.body.resolution);
            res.json(newResolution);
        } else {
            res.status(400).send('The resolution must be at least 10 characters and no more than 400 characters.')
        }
    }
    async getResolution(req, res) {
        const resolution = await ResolutionService.getResolution(req.body.name);
        res.json(resolution);
    }
    async deleteResolution(req, res) {
        const deletedResolution = await ResolutionService.deleteResolution(req.params.key);
        res.json(deletedResolution);

    }
}


export default new ResolutionController();