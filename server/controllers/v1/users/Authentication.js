const _ = require('lodash');
const { RESPONSE_STATUS } = require('./../../../utils/constants');

class Authentication {

    init(req, res, next) {

        let user = req.user;

        // Success
        return next({
            data: {
                user: _.pick(user, ['_id', 'name', 'surname', 'username'])
            },
            message: `Successful authentication by user (${user._id} - ${user.name + ' ' + user.surname})`,
            status: RESPONSE_STATUS.SUCCESS
        });

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