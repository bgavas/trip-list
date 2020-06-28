const { LANGUAGES, HEADER, DEFAULT_LANGUAGE } = require('./../utils/constants');

class Default {

	constructor(req, res, next) {
	
		// Get language 
		let language = req.headers[HEADER.LANGUAGE] ? 
			req.headers[HEADER.LANGUAGE].toString().substring(0, 2) : null;
		if (!language || !LANGUAGES.includes(language)) {
			language = DEFAULT_LANGUAGE;
		}
		
		// Set language
		req.language = language;

		return next();

	}

}

// Export
module.exports = Default;