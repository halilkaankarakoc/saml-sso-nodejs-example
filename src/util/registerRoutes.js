const fs = require('fs');
const path = require('path');
const { conformsTo } = require('lodash');
const Router = require('express').Router();

const registerRoutes = () => {
    const FILE_REGEX = /[\s\S]+(.|-)route.js/im;

    const routesPath = path.resolve(__dirname, '../routes');

    const routeConformity = {
        path: value => typeof value === 'string',
        method: value => typeof value === 'string' && ['post', 'get', 'put', 'patch', 'delete'].includes(value.toLowerCase()),
        handler: value => typeof value === 'function',
    };

    const files = fs.readdirSync(routesPath).filter(file => FILE_REGEX.test(file));

    const conformedRoutes = [];

    for (const file of files) {
        const name = file.substr(0, file.lastIndexOf('.'));

        const route = require(path.resolve(routesPath, name));
        if (conformsTo(route, routeConformity)) {
            conformedRoutes.push(route);
        }
    }

    for (const route of conformedRoutes) {
        Router[route.method.toLowerCase()](route.path, route.handler);
    }

    return Router;
}

module.exports = registerRoutes;