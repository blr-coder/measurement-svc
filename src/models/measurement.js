class Measurement {
    constructor({ id, sourceId, measuredAt, values }) {
        this.id = id;
        this.sourceId = sourceId;
        this.measuredAt = measuredAt;
        this.values = values;
    }
}

module.exports = {
    Measurement,
};
