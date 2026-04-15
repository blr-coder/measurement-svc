function getMeasurementsReport(request, response, router) {
    return router.sendJson(response, 200, {
        items: [],
        total: 0,
    });
}

module.exports = getMeasurementsReport;