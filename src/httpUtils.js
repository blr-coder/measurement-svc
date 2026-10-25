const { HttpError } = require('./errors');

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

async function readBody(request, limitBytes = 1_000_000) {
    let size = 0;
    const chunks = [];

    for await (const chunk of request) {
        size += chunk.length;

        if (size > limitBytes) {
            throw new HttpError(413, 'body too large');
        }

        chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString('utf8');
}

module.exports = {
    sendText,
    sendJson,
    readBody,
};