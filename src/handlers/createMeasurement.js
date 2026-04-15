function createMeasurement(request, response, router) {
    return router.sendJson(response, 200, { status: 'ok' });
}

module.exports = createMeasurement;