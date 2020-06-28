const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { HEADER, EXPIRATION } = require('./../../../../utils/constants');
const { AUTHENTICATION_FAILED } = require('./../../../../utils/errors');
const mockDb = require('./../../../../databases/mock');
const { app } = require('./../../../../index');

class Authentication {

    static init(routePrefix) {

        describe(`GET/${routePrefix}/self/authentication`, () => {
    
            it('should verify the authentication of user', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

                request(app.api)
                    .get(`/${routePrefix}/self/authentication`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeTruthy();
                    })
                    .end(done);
    
            });
    
            it('should verify and issue a new token if old token is expired', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000)
                }, process.env.JWT_SECRET).toString();

                request(app.api)
                    .get(`/${routePrefix}/self/authentication`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(200)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeTruthy();
                        expect(token).not.toBe(res.headers[HEADER.AUTHORIZATION]);
                    })
                    .end(done);
    
            });
    
            it('should not verify if token is incorrect', (done) => {
    
                const token = 'Bearer incorrect';

                request(app.api)
                    .get(`/${routePrefix}/self/authentication`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(401)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeFalsy();
                        expect(res.body.error.code).toBe(AUTHENTICATION_FAILED.code);
                    })
                    .end(done);
    
            });
    
            it('should not verify if token is issued with incorrect secret', (done) => {
    
                const token = 'Bearer ' + jwt.sign({
                    _id: mockDb.users[0]._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, 'incorrect').toString();

                request(app.api)
                    .get(`/${routePrefix}/self/authentication`)
                    .set(HEADER.AUTHORIZATION, token)
                    .expect(401)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeFalsy();
                        expect(res.body.error.code).toBe(AUTHENTICATION_FAILED.code);
                    })
                    .end(done);
    
            });
    
            it('should not verify if no token is supplied', (done) => {

                request(app.api)
                    .get(`/${routePrefix}/self/authentication`)
                    .expect(401)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeFalsy();
                        expect(res.body.error.code).toBe(AUTHENTICATION_FAILED.code);
                    })
                    .end(done);
    
            });
    
        });

    }

}

module.exports = Authentication;