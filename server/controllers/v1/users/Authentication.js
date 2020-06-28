const { RESPONSE_STATUS } = require('./../../../utils/constants');

class Authentication {

    init(req, res, next) {

        const { app } = require('./../../../index');
        const models = app.portDatabase.models;

        let user = req.user;

        // Success
        return models.user
            .getUser(user.id)
            // Success
            .then(user => next({
                data: {
                    user: user.toUserObject()
                },
                message: `Successful authentication by user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.SUCCESS
            }))
            // Fail
            .catch(err => next({
                data: err,
                message: `Authentication failed for user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            }));

    }

}

module.exports = Authentication;

/**
 * @swagger
 * /api/v1/users/self/authentication:
 *   get:
 *     tags:
 *       - User
 *     description: Check authentication
 *     produces:
 *       - application/json
 *     responses:
 *       200:
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
 *       401:
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