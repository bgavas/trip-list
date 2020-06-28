const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RESPONSE_STATUS, HEADER, EXPIRATION } = require('./../../../utils/constants');
const { USER_NOT_FOUND, INCORRECT_CREDENTIALS } = require('./../../../utils/errors');
const mockDb = require('./../../../databases/mock');

class Login {

    init(req, res, next) {

        let token;
        const { username, password } = req.body;

        let user = mockDb.users.find(u => u.username === username);

        return Promise
            .resolve()
            .then(() => {

                // User not found
                if (!user) return Promise.reject(USER_NOT_FOUND);
                // Password incorrect
                if (!bcrypt.compareSync(password, user.password)) {
                    return Promise.reject(INCORRECT_CREDENTIALS);
                }

                // Create token
                token = 'Bearer ' + jwt.sign({
                    _id: user._id,
                    exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
                }, process.env.JWT_SECRET).toString();

            })
            // Success
            .then(() => next({
                data: {
                    user
                },
                headers: { [HEADER.AUTHORIZATION]: 'Bearer ' + token },
                message: `Successful login by user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.SUCCESS
            }))
            // Fail
            .catch(err => next({
                data: err,
                message: `Login failed for username (${username})`,
                status: RESPONSE_STATUS.FAIL
            }));

    }

}

module.exports = Login;

/**
 * @swagger
 * definition:
 *   userLogin:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "username": "username1",
 *       "password": "123456"
 *     }
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   get:
 *     tags:
 *       - User
 *     description: Login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userLogin
 *         in: body
 *         schema:
 *           $ref: '#/definitions/userLogin'
 *     responses:
 *       200:
 *         headers:
 *           authorization:
 *             schema:
 *               type: string
 *             description: Authorization token
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             data:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   $ref: '#/definitions/user'
 *       400:
 *         description:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/errorResponse'
 *       500:
 *         description:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/errorResponse'
 */