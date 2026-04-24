const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');

const { createServer } = require('../../src/server');

async function startTestServer() {
    const server = createServer();

    server.listen(0);
    await once(server, 'listening');

    const address = server.address();

    return {
        server,
        baseUrl: `http://127.0.0.1:${address.port}`,
    };
}

test('POST /measurements returns 200 and success payload', async t => {
    const { server, baseUrl } = await startTestServer();

    t.after(() => {
        server.close();
    });

    const response = await fetch(`${baseUrl}/measurements`, {
        method: 'POST',
    });

    assert.equal(response.status, 200);
    assert.equal(
        response.headers.get('content-type'),
        'application/json; charset=utf-8',
    );

    const body = await response.json();

    assert.deepEqual(body, { status: 'ok' });
});

test('GET /measurement-report returns 200 and empty report', async t => {
    const { server, baseUrl } = await startTestServer();

    t.after(() => {
        server.close();
    });

    const response = await fetch(
        `${baseUrl}/measurement-report?from=2026-03-30T00:00:00Z&to=2026-03-31T00:00:00Z`,
    );

    assert.equal(response.status, 200);
    assert.equal(
        response.headers.get('content-type'),
        'application/json; charset=utf-8',
    );

    const body = await response.json();

    assert.deepEqual(body, {
        items: [],
        total: 0,
    });
});