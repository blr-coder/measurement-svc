const { sendJson } = require('../httpUtils');

function getMeasurementsReport(measurementRepository) {
    return async function(request, response) {
        const measurements = await measurementRepository.findAll();

        return sendJson(response, 200, {
            items: measurements,
            total: measurements.length,
        });
    };
}

module.exports = getMeasurementsReport;