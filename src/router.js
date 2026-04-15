const { URL } = require('node:url');

class Router {
    constructor() {
        this.validMethods = new Set(['GET', 'POST']);
        this.routes = [];
    }

    register(method, path, handler) {
        if (typeof method !== 'string') {
            throw new TypeError('method must be a string');
        }

        if (typeof path !== 'string') {
            throw new TypeError('path must be a string');
        }

        if (typeof handler !== 'function') {
            throw new TypeError('handler must be a function');
        }

        const normalizedMethod = method.toUpperCase();

        if (!this.validMethods.has(normalizedMethod)) {
            throw new Error(`unsupported method: ${normalizedMethod}`);
        }

        if (!path.startsWith('/')) {
            throw new Error(`path must start with "/": ${path}`);
        }

        const duplicateRoute = this.routes.find(
            route => route.method === normalizedMethod && route.path === path,
        );

        if (duplicateRoute) {
            throw new Error(`route already registered: ${normalizedMethod} ${path}`);
        }

        this.routes.push({
            method: normalizedMethod,
            path,
            handler,
        });
    }

    async handle(request, response) {
        const method = request.method?.toUpperCase();

        if (!this.validMethods.has(method)) {
            return this.sendText(response, 405, 'method not allowed');
        }

        const url = new URL(request.url, 'http://localhost');
        const pathname = url.pathname;

        const exactRoute = this.routes.find(
            route => route.method === method && route.path === pathname,
        );

        if (exactRoute) {
            return exactRoute.handler(request, response, this);
        }

        const pathExists = this.routes.some(route => route.path === pathname);

        if (pathExists) {
            return this.sendText(response, 405, 'method not allowed');
        }

        return this.sendText(response, 404, 'not found');
    }

    sendText(response, statusCode, message) {
        response.writeHead(statusCode, {
            'Content-Type': 'text/plain; charset=utf-8',
        });

        response.end(message);
    }

    sendJson(response, statusCode, payload) {
        response.writeHead(statusCode, {
            'Content-Type': 'application/json; charset=utf-8',
        });

        response.end(JSON.stringify(payload));
    }
}

module.exports = Router;