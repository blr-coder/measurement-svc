const { sendJson } = require('../httpUtils');

function createMeasurement(request, response) {
    return sendJson(response, 200, { status: 'ok' });
}

module.exports = createMeasurement;