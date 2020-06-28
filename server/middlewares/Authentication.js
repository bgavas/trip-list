const jwt = require('jsonwebtoken');
const { HEADER, RESPONSE_STATUS, EXPIRATION } = require('../utils/constants');
const { AUTHENTICATION_FAILED } = require('../utils/errors');
const logger = require('../utils/logger');
const mockDb = require('../databases/mock');

class Authentication {

	static user(req, res, next) {
	
		// Get token
		let token = req.header(HEADER.AUTHORIZATION);
	
		// Token not exists
		if (!token || token.split(' ').length !== 2) {
			logger.warn('Authentication failed: Token does not exist');
			return res.status(401).send({
				status: RESPONSE_STATUS.FAIL,
				error: {
					code: AUTHENTICATION_FAILED.code,
					message: AUTHENTICATION_FAILED.message[req.language]
				}
			});
		}

		// Extract token
		token = token.split(' ')[1];

		// Verify token
		jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {

			// Failed
			if (err) {

				// Expiration error. Issue new token
				if (err.name === 'TokenExpiredError') {

					// Get payload
					const payload = jwt.verify(token, process.env.JWT_SECRET, {
						ignoreExpiration: true
					});
					// Create new token
					token = 'Bearer ' + jwt.sign({
						_id: payload._id,
						exp: Math.floor(Date.now() / 1000) + EXPIRATION.JWT_TOKEN
					}, process.env.JWT_SECRET).toString();

					// Set user object in req
					req.user = mockDb.users.find(user => user._id.toHexString() === payload._id);
					// Set header
					res.setHeader(HEADER.AUTHORIZATION, 'Bearer ' + token);
					// Successful
					return Promise.resolve(next());

				}
				// Incorrect token
				else {

					logger.warn('Authentication failed. Error: ' + err);
					return res.status(401).send({
						status: RESPONSE_STATUS.FAIL,
						error: {
							code: AUTHENTICATION_FAILED.code,
							message: AUTHENTICATION_FAILED.message[req.language]
						}
					});

				}

			}

			// Set user object in req
			req.user = mockDb.users.find(user => user._id.toHexString() === decoded._id);
			// Set header
			res.setHeader(HEADER.AUTHORIZATION, 'Bearer ' + token);
			// Successful
			return Promise.resolve(next());

		});

	}

}

// Export
module.exports = Authentication;