const MeasurementRepository = require('./MeasurementRepository');
const { Measurement } = require('../models/measurement');
const { DuplicateMeasurementError } = require('../errors');

const UNIQUE_VIOLATION = '23505';
const SOURCE_MEASURED_AT_CONSTRAINT = 'measurements_source_id_measured_at_key';

class PostgresMeasurementRepository extends MeasurementRepository {
    constructor(pool) {
        super();

        this.pool = pool;
    }

    async create(measurement) {
        const query = `
        INSERT INTO measurement.measurements (
            source_id,
            measured_at,
            values_json
        )
        VALUES ($1, $2, $3::jsonb)
    `;

        try {
            await this.pool.query(query, [
                measurement.sourceId,
                measurement.measuredAt,
                JSON.stringify(measurement.values),
            ]);
        } catch (error) {
            if (error.code === UNIQUE_VIOLATION && error.constraint === SOURCE_MEASURED_AT_CONSTRAINT) {
                throw new DuplicateMeasurementError(measurement.sourceId, measurement.measuredAt);
            }

            throw error;
        }
    }

    async findAll() {
        const query = `
        SELECT
            id,
            source_id,
            measured_at,
            values_json
        FROM measurement.measurements
        ORDER BY measured_at, id
    `;

        const result = await this.pool.query(query);

        return result.rows.map(row => {
            return new Measurement({
                id: row.id,
                sourceId: row.source_id,
                measuredAt: row.measured_at,
                values: row.values_json,
            });
        });
    }
}

module.exports = PostgresMeasurementRepository;