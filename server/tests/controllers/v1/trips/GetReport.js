const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { HEADER, EXPIRATION } = require('./../../../../utils/constants');
const { MISSING_FIELDS } = require('./../../../../utils/errors');
const mockDb = require('./../../../../databases/mock');
const { app } = require('./../../../../index');

class GetReport {

    static init(routePrefix) {

        describe(`GET/${routePrefix}/report`, () => {
    
            it('should get report', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&radius=15';

                request(app.api)
                    .get(`/${routePrefix}/report/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.data.trips.length).toBeGreaterThan(0);
                    })
                    .end(done);
    
            });
    
            it('should not get trip report if latitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?longitude=-97.38887025&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/report/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not get trip report if longitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/report/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not get trip report if radius is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025';

                request(app.api)
                    .get(`/${routePrefix}/report/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
        });

    }

}

module.exports = GetReport;