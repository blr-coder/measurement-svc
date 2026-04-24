function sendText(response, statusCode, message) {
    response.writeHead(statusCode, {
        'Content-Type': 'text/plain; charset=utf-8',
    });

    response.end(message);
}

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
    });

    response.end(JSON.stringify(payload));
}

module.exports = {
    sendText,
    sendJson,
};