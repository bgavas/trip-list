const Authentication = require('./../middlewares/Authentication');

class RouteHelper {

    constructor() {}

    static defineRoutes(routes, version) {

        const router = require('express').Router();

        // Create all routes
        routes.forEach((endpoint) => {

            // Set version if endpoint doesn't support
            if (!endpoint.versions.includes(version)) version = endpoint.fallbackVersion;

            // Set handlers
            let handlers = [];
            if (endpoint.authentication) handlers.push(Authentication.user);
            handlers = handlers.concat(endpoint.handlers);

            // Set controller
            router[endpoint.type](endpoint.path, handlers, endpoint.init);

        });

        // Return router
        return router;

    }

}

module.exports = RouteHelper;