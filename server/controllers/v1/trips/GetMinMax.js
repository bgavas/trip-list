const { RESPONSE_STATUS } = require('./../../../utils/constants');
const { MISSING_FIELDS, INCORRECT_DATE } = require('./../../../utils/errors');

class GetMinMax {

    init(req, res, next) {

        const { app } = require('./../../../index');
        const models = app.database.models;

        const user = req.user;
        const { latitude, longitude, radius } = req.query;
        const promises = [];
        let where = {};
        let fieldError;

        // Missing fields
        if (!latitude || !longitude || !radius) fieldError = MISSING_FIELDS;

        // At least one field is not valid
        if (fieldError) {
            return next({
                data: fieldError,
                message: `Failed while fetching the min-max trips by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Geospatial where parameters
        where.start = {
            $geoWithin: {
                // 6378.1 = earth radius in km
                $centerSphere: [[longitude, latitude], radius / 6378.1]
            }
        }

        // Get max
        promises.push(
            models.trip
                .find(where)
                .sort({ distance_travelled: -1 })
                .limit(1)
        );

        // Get min
        promises.push(
            models.trip
                .find(where)
                .sort({ distance_travelled: 1 })
                .limit(1)
        );

        return Promise
            .all(promises)
            // Success
            .then(([max, min]) => next({
                data: {
                    max,
                    min
                },
                message: `Min-max trips succesfully fetched by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.SUCCESS
            }))
            // Fail
            .catch(err => next({
                data: err,
                message: `Failed while fetching the min-max trips by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            }));

    }

}

module.exports = GetMinMax;

/**
 * @swagger
 * /api/v1/trips/min-max:
 *   get:
 *     tags:
 *       - Trip
 *     description: Get trip list
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: latitude
 *         in: query
 *         type: number
 *         format: double
 *         example: 31.17821068
 *       - name: longitude
 *         in: query
 *         type: number
 *         format: double
 *         example: -97.38887025
 *       - name: radius
 *         in: query
 *         type: integer
 *         example: 1
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
 *                 max:
 *                   type: object
 *                   $ref: '#/definitions/trip'
 *                 min:
 *                   type: object
 *                   $ref: '#/definitions/trip'
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