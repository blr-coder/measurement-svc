const { sendJson } = require('../httpUtils');

function getMeasurementsReport(request, response) {
    return sendJson(response, 200, {
        items: [],
        total: 0,
    });
}

module.exports = getMeasurementsReport;