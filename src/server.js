const http = require('node:http');

function createServer(router) {
    return http.createServer((request, response) => {
        router.handle(request, response);
    });
}

module.exports = {
    createServer,
};