const RouteHelper = require('./../helper/RouteHelper');
const GetTrips = require('./../controllers/v1/trips/GetTrips');
const GetMinMax = require('./../controllers/v1/trips/GetMinMax');

class Trips {

    init(version) {

        // Route list
        this.routes = [{
            init: new GetTrips().init,
            description: 'Get trips of customer',
            fallbackVersion: 'v1',
            handlers: [],
            path: '/',
            authentication: true,
            type: 'get',
            versions: ['v1']
        }, {
            init: new GetMinMax().init,
            description: 'Get min and max distance travelled',
            fallbackVersion: 'v1',
            handlers: [],
            path: '/min-max',
            authentication: true,
            type: 'get',
            versions: ['v1']
        }];

        // Define routes
        return RouteHelper.defineRoutes(this.routes, version);

    }

}

// Export route
module.exports = Trips;