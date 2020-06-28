const expect = require('expect');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { HEADER } = require('./../../../../utils/constants');
const { USER_NOT_FOUND, INCORRECT_CREDENTIALS } = require('./../../../../utils/errors');
const mockDb = require('./../../../../databases/mock');
const { app } = require('./../../../../index');

class Login {

    static init(routePrefix) {

        describe(`GET/${routePrefix}/login`, () => {
    
            it('should login', (done) => {

                const user = mockDb.users[0];

                request(app.api)
                    .post(`/${routePrefix}/login`)
                    .send({
                        username: user.username,
                        password: user.plainPassword
                    })
                    .expect(200)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeTruthy();
                        expect(res.body.data.user._id).toBe(user._id.toHexString());
                    })
                    .end(done);
    
            });
    
            it('should not login if user not found', (done) => {

                const user = mockDb.users[0];

                request(app.api)
                    .post(`/${routePrefix}/login`)
                    .send({
                        username: 'no user',
                        password: user.plainPassword
                    })
                    .expect(400)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeFalsy();
                        expect(res.body.error.code).toBe(USER_NOT_FOUND.code);
                    })
                    .end(done);
    
            });
    
            it('should not login if password is incorrect', (done) => {

                const user = mockDb.users[0];

                request(app.api)
                    .post(`/${routePrefix}/login`)
                    .send({
                        username: user.username,
                        password: user.plainPassword + 'dummy'
                    })
                    .expect(400)
                    .expect(res => {
                        expect(res.headers[HEADER.AUTHORIZATION]).toBeFalsy();
                        expect(res.body.error.code).toBe(INCORRECT_CREDENTIALS.code);
                    })
                    .end(done);
    
            });
    
        });

    }

}

module.exports = Login;