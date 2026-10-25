const Router = require('./router');
const pool = require('./db/postgres');

const createMeasurement = require('./handlers/createMeasurement');
const getMeasurementsReport = require('./handlers/getMeasurementsReport');
const PostgresMeasurementRepository = require('./repositories/PostgresMeasurementRepository');

function createApp() {
    const router = new Router();

    const measurementRepository = new PostgresMeasurementRepository(pool);

    router.register('POST', '/measurements', createMeasurement(measurementRepository));
    router.register('GET', '/measurement-report', getMeasurementsReport(measurementRepository));

    return router;
}

module.exports = {
    createApp,
};