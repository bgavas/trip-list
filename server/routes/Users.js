const RouteHelper = require('./../helper/RouteHelper');
const Authentication = require('./../controllers/v1/users/Authentication');
const Login = require('./../controllers/v1/users/Login');

class Users {

    init(version) {

        // Route list
        this.routes = [{
            init: new Authentication().init,
            description: 'Check authentication',
            fallbackVersion: 'v1',
            handlers: [],
            path: '/self/authentication',
            authentication: true,
            type: 'get',
            versions: ['v1']
        }, {
            init: new Login().init,
            description: 'Login',
            fallbackVersion: 'v1',
            handlers: [],
            path: '/login',
            authentication: false,
            type: 'post',
            versions: ['v1']
        }];

        // Define routes
        return RouteHelper.defineRoutes(this.routes, version);

    }

}

// Export route
module.exports = Users;