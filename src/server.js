const http = require('node:http');

const { createApp } = require('./app');
const config = require('./config');

function createServer() {
    const app = createApp();

    return http.createServer((request, response) => {
        app.handle(request, response);
    });
}

function startServer() {
    const server = createServer();

    server.listen(config.app.port, () => {
        console.log(`Server is running on http://localhost:${config.app.port}`);
    });

    return server;
}

module.exports = {
    createServer,
    startServer,
};

if (require.main === module) {
    startServer();
}