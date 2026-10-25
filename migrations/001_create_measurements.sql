-- Up Migration

CREATE SCHEMA IF NOT EXISTS measurement;

CREATE TABLE measurement.measurements (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id   text        NOT NULL,
    measured_at timestamptz NOT NULL,
    values_json jsonb       NOT NULL,
    created_at  timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT measurements_source_id_measured_at_key UNIQUE (source_id, measured_at)
);

CREATE INDEX measurements_measured_at_idx
    ON measurement.measurements (measured_at);

-- Down Migration

DROP TABLE measurement.measurements;

DROP SCHEMA measurement;
