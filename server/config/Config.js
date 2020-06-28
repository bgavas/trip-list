const { ENVIRONMENT } = require('./../utils/constants');

class Config {

	constructor() {
		this.env = process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT;
		process.env.NODE_ENV = this.env;
	}

	setEnvKeys() {
			
		const conf = require('./config.json');

		// Get keys according to the environment
		const envConfig = conf[this.env];

		// Set variables
		Object.keys(envConfig).forEach(key => {
			process.env[key] = envConfig[key];
		});

	}

}

module.exports = Config;