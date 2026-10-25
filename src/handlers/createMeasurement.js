const {sendJson, readBody} = require('../httpUtils');
const {Measurement} = require('../models/measurement');
const {HttpError, DuplicateMeasurementError} = require('../errors');

function createMeasurement(measurementRepository) {

    return async function (request, response) {
        const rawBody = await readBody(request);

        let body;

        try {
            body = JSON.parse(rawBody);
        } catch {
            throw new HttpError(400, 'invalid JSON');
        }

        // TODO: validate body

        const measurement = new Measurement({
            sourceId: body.sourceId,
            measuredAt: body.measuredAt,
            values: body.values,
        });

        try {
            await measurementRepository.create(measurement);
        } catch (error) {
            if (error instanceof DuplicateMeasurementError) {
                throw new HttpError(409, error.message);
            }

            throw error;
        }

        return sendJson(response, 200, {
            status: 'ok'
        });
    };
}

module.exports = createMeasurement;