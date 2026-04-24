const Router = require('./router');

const createMeasurement = require('./handlers/createMeasurement');
const getMeasurementsReport = require('./handlers/getMeasurementsReport');

function createApp() {
    const router = new Router();

    router.register('POST', '/measurements', createMeasurement);
    router.register('GET', '/measurement-report', getMeasurementsReport);

    return router;
}

module.exports = {
    createApp,
};