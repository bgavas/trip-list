const fs = require('fs');
const testConfig = require('./../../config/test.config');

class Trips {

    static init() {

        describe('TRIPS ROUTE', () => {
        
            const filterTests = testConfig.functionFilter.map(item => item + '.js');
        
            let routePrefix = 'api/v1/trips';
        
            // Read each test file for v1
            fs
                .readdirSync(__dirname + '/../controllers/v1/trips')
                .forEach(file => {
                    if (filterTests.length === 0 || filterTests.includes(file))
                        require(__dirname + '/../controllers/v1/trips/' + file).init(routePrefix);
                });
        
        });

    }

}

module.exports = Trips;