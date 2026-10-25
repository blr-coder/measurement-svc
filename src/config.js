function getPort() {
    const value = process.env.PORT;

    if (!value) {
        return 3000;
    }

    const port = Number(value);

    if (!Number.isInteger(port) || port <= 0) {
        throw new Error(`Invalid PORT value: ${value}`);
    }

    return port;
}

const config = {
    app: {
        port: getPort(),
    },

    postgres: {
        host: 'localhost',
        port: 3499,
        user: 'measurement',
        password: 'measurement',
        database: 'measurement',
        schema: 'measurement',
    },
};

module.exports = config;