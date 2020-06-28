const moment = require('moment');
const { RESPONSE_STATUS } = require('./../../../utils/constants');
const { MISSING_FIELDS, INCORRECT_DATE } = require('./../../../utils/errors');

class GetTrips {

    init(req, res, next) {

        const { app } = require('./../../../index');
        const models = app.database.models;

        const user = req.user;
        const { latitude, longitude, radius, start_date, end_date } = req.query;
        let where = {};
        let fieldError;

        // Missing fields
        if (!latitude || !longitude || !radius) fieldError = MISSING_FIELDS;

        // Start date supplied by the user
        if (start_date) {
            // Not valid start date
            if (!moment(start_date).isValid()) fieldError = INCORRECT_DATE;
            // Valid start date
            else where.start_date = start_date;
        }
        // End date supplied by the user
        if (end_date) {
            // Not valid end date
            if (!moment(end_date).isValid()) fieldError = INCORRECT_DATE;
            // Valid end date
            else where.complete_date = end_date;
        }

        // At least one field is not valid
        if (fieldError) {
            return next({
                data: fieldError,
                message: `Failed while fetching the trips by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Geospatial where parameters
        where.start = {
            $geoWithin: {
                // 6378.1 = earth radius in km
                $centerSphere: [ [longitude, latitude], radius / 6378.1 ]
            }
        }

        return models.trip
            .find(where)
            // Success
            .then(trips => next({
                data: {
                    trips
                },
                message: `Trips succesfully fetched by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.SUCCESS
            }))
            // Fail
            .catch(err => next({
                data: err,
                message: `Failed while fetching the trips by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            }));

    }

}

module.exports = GetTrips;

/**
 * @swagger
 * /api/v1/trips:
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
 *       - name: start_date
 *         in: query
 *         type: string
 *       - name: end_date
 *         in: query
 *         type: string
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
 *                 trips:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/definitions/trip'
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