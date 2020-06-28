const { app } = require('./../../index');

class Utils {

    static init() {

        describe('UTILS', () => {

            // Wait for database connection
            describe(`Database connection`, function() {

                // 20 seconds timeout
                this.timeout(20 * 1000);
        
                it('should wait for database connection', (done) => {

                    const repeatInterval = setInterval(() => {
                        if (app.database.getConnection()) {
                            clearInterval(repeatInterval);
                            done();
                        }
                    }, 1000);
        
                });
        
            });
        
        });

    }

}

module.exports = Utils;