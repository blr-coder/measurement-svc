class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.name = 'HttpError';
        this.statusCode = statusCode;
    }
}

class DuplicateMeasurementError extends Error {
    constructor(sourceId, measuredAt) {
        super(`measurement already exists: sourceId=${sourceId}, measuredAt=${measuredAt}`);

        this.name = 'DuplicateMeasurementError';
        this.sourceId = sourceId;
        this.measuredAt = measuredAt;
    }
}

module.exports = {
    HttpError,
    DuplicateMeasurementError,
};
