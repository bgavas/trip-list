const fs = require('fs');
const testConfig = require('./../../config/test.config');

class Users {

    static init() {

        describe('USERS ROUTE', () => {
        
            const filterTests = testConfig.functionFilter.map(item => item + '.js');
        
            let routePrefix = 'api/v1/users';
        
            // Read each test file for v1
            fs
                .readdirSync(__dirname + '/../controllers/v1/users')
                .forEach(file => {
                    if (filterTests.length === 0 || filterTests.includes(file))
                        require(__dirname + '/../controllers/v1/users/' + file).init(routePrefix);
                });
        
        });

    }

}

module.exports = Users;