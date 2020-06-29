const { RESPONSE_STATUS } = require('./../../../utils/constants');
const { MISSING_FIELDS } = require('./../../../utils/errors');

class GetReport {

    init(req, res, next) {

        const { app } = require('./../../../index');
        const models = app.database.models;

        const user = req.user;
        const { latitude, longitude, radius } = req.query;
        let where = {};
        let fieldError;

        // Missing fields
        if (!latitude || !longitude || !radius) fieldError = MISSING_FIELDS;

        // At least one field is not valid
        if (fieldError) {
            return next({
                data: fieldError,
                message: `Failed while creating the report by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            });
        }

        // Geospatial where parameters
        where.start = {
            $geoWithin: {
                // 6378.1 = earth radius in km
                $centerSphere: [ [parseFloat(longitude), parseFloat(latitude)], radius / 6378.1 ]
            }
        }

        return models.trip
            .aggregate([{ 
                '$match': where
            }, {
                '$group': {
                    _id: '$year',
                    count: { $sum: 1 }
                }
            }])
            .project({ _id: 0, year: '$_id', count: 1 })
            // Success
            .then(trips => next({
                data: {
                    yearReport: trips.sort((a, b) => a.year > b.year ? -1 : 1)
                },
                message: `Report succesfully created by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.SUCCESS
            }))
            // Fail
            .catch(err => next({
                data: err,
                message: `Failed while creating the report by the user (${user.id} - ${user.name + ' ' + user.surname})`,
                status: RESPONSE_STATUS.FAIL
            }));

    }

}

module.exports = GetReport;

/**
 * @swagger
 * /api/v1/trips/report:
 *   get:
 *     tags:
 *       - Trip
 *     description: Get trip report
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
 *                 yearReport:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: integer
 *                       count:
 *                         type: integer
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