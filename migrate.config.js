// Config for node-pg-migrate (passed via --config-file).
// Connection settings come from src/config.js, so the app and migrations share one source.
// DATABASE_URL, if set, takes precedence over them.
const config = require('./src/config');

const { host, port, user, password, database } = config.postgres;

module.exports = {
    host,
    port,
    user,
    password,
    database,

    'migrations-dir': 'migrations',
    'migrations-table': 'pgmigrations',
    'migration-file-language': 'sql',
    'migration-filename-format': 'index',
};
