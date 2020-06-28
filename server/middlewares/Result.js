const { RESPONSE_STATUS } = require('./../utils/constants');
const errors = require('./../utils/errors');
const logger = require('../utils/logger');

class Result {

	constructor(result, req, res, next) {

		// Initial check for extreme cases
		let response = this.initialCheck(result, req, res);
		if (response) return response.status(response.status).send(response.data);

		// Get data
		const data = result.data;

		// Success
		if (result.status === RESPONSE_STATUS.SUCCESS) this.successful(result, res, data);
		// Error with data
		else if (data) this.errorWithData(result, req, res, data);
		// Error withour data
		else this.errorWithoutData(result, req, res);

	}

	successful(result, res, data) {

		// Set headers if exists
		if (result.headers) res.header(result.headers);

		// Log warning
		logger.info(JSON.stringify(result, null, 2));

		// Return success
		return res.status(200).send({
			status: RESPONSE_STATUS.SUCCESS,
			data
		});

	}

	errorWithData(result, req, res, data) {

		// Find the error
		const err = Object.values(errors).find(item => item.code === data.code);
		let returnObject = {
			status: RESPONSE_STATUS.FAIL,
			error: null
		};

		let status = 200;

		let logError = errors.UNKNOWN_ERROR;

		// Known error
		if (err) {
			returnObject.error = { code: err.code, message: err.message[req.language] };
			logError = err;
		}
		// Unknown error
		else {
			status = 400;
			returnObject.error = {
				code: errors.UNKNOWN_ERROR.code,
				message: errors.UNKNOWN_ERROR.message[req.language]
			};
		}

		const trace = (result.data.stack ? result.data.stack : '') +
			'\n' + 
			JSON.stringify(returnObject.error, null, 2);

		// Log warning
		logger.warn(trace);

		// Error
		return res.status(status).send(returnObject);

	}

	errorWithoutData(result, req, res) {

		// Unknown error
		let returnObject = {
			status: RESPONSE_STATUS.FAIL,
			error: {
				code: errors.INTERNAL_SERVER_ERROR.code,
				message: errors.INTERNAL_SERVER_ERROR.message[req.language]
			}
		};

		const trace = result.stack + '\n' + JSON.stringify(returnObject.error, null, 2);

		// Log error
		logger.error(trace);

		// Unknown error
		return res.status(500).send(returnObject);

	}

	initialCheck(result, req, res) {

		let response;

		// If headers set before skip
		if (res.headersSent) {
			logger.error('Internal servor error. Error: Headers sent.');
			response = {
				status: 500,
				data: {
					status: RESPONSE_STATUS.FAIL,
					error: {
						code: errors.INTERNAL_SERVER_ERROR.code,
						message: errors.INTERNAL_SERVER_ERROR.message[req.language]
					}
				}
			}
		}
		// The result didn't come for any reason
		else if (!result) {
			logger.error('Internal servor error. Error: ' + result);
			response = {
				status: 500,
				data: {
					status: RESPONSE_STATUS.FAIL,
					error: {
						code: errors.INTERNAL_SERVER_ERROR.code,
						message: errors.INTERNAL_SERVER_ERROR.message[req.language]
					}
				}	
			}
		}

		return response;

	}

}

// Export
module.exports = Result;