const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
    host: config.postgres.host,
    port: config.postgres.port,
    user: config.postgres.user,
    password: config.postgres.password,
    database: config.postgres.database,
});

module.exports = pool;