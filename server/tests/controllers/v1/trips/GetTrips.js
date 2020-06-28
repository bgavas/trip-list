const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { HEADER, EXPIRATION } = require('./../../../../utils/constants');
const { MISSING_FIELDS, INCORRECT_DATE } = require('./../../../../utils/errors');
const mockDb = require('./../../../../databases/mock');
const { app } = require('./../../../../index');

class GetTrips {

    static init(routePrefix) {

        describe(`GET/${routePrefix}`, () => {
    
            it('should get trip list', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.data.trips.length).toBeGreaterThan(0);
                    })
                    .end(done);
    
            });
    
            it('should get trip list with a start date', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&radius=5&start_date=2016-06-23T22:28:14.000Z';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.data.trips.length).toBe(1);
                    })
                    .end(done);
    
            });
    
            it('should get trip list with an end date', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&radius=5&end_date=2016-06-23T22:28:28.000Z';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.data.trips.length).toBe(1);
                    })
                    .end(done);
    
            });
    
            it('should not get trip list if latitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?longitude=-97.38887025&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not get trip list if longitude is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&radius=1';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should not get trip list if radius is missing', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(MISSING_FIELDS.code);
                    })
                    .end(done);
    
            });
    
            it('should get trip list if start date is invalid', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&start_date=invalid';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(INCORRECT_DATE.code);
                    })
                    .end(done);
    
            });
    
            it('should get trip list if end date is invalid', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                const query = '?latitude=31.17821068&longitude=-97.38887025&end_date=invalid';

                request(app.api)
                    .get(`/${routePrefix}/${query}`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(400)
                    .expect(res => {
                        expect(res.body.error.code).toBe(INCORRECT_DATE.code);
                    })
                    .end(done);
    
            });
    
        });

    }

}

module.exports = GetTrips;