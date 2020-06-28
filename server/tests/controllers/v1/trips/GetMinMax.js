const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { HEADER, EXPIRATION } = require('./../../../../utils/constants');
const { MISSING_FIELDS, INCORRECT_DATE } = require('./../../../../utils/errors');
const mockDb = require('./../../../../databases/mock');
const { app } = require('./../../../../index');

class GetMinMax {

    static init(routePrefix) {

        describe(`GET/${routePrefix}`, () => {
    
            it('should get min-max trip list', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/min-max/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.data.min).toBeTruthy();
                        expect(res.body.data.max).toBeTruthy();
                    })
                    .end(done);
    
            });
    
            it('should not min-max get trip list if latitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?longitude=-97.38887025&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/min-max/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not min-max get trip list if longitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/min-max/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not min-max get trip list if radius is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025';

                request(app.api)
                    .get(`/${routePrefix}/min-max/${query}`)
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

module.exports = GetMinMax;