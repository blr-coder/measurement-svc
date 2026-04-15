const Router = require('./router');
const { createServer } = require('./server');

const config = require('./config');

const createMeasurement = require('./handlers/createMeasurement');
const getMeasurementsReport = require('./handlers/getMeasurementsReport');

const router = new Router();

router.register('POST', '/measurements', createMeasurement);
router.register('GET', '/measurement-report', getMeasurementsReport);

const server = createServer(router);

server.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
});