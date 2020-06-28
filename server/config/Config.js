const { ENVIRONMENT } = require('./../utils/constants');

class Config {

	constructor() {
		this.env = process.env.NODE_ENV || ENVIRONMENT.DEVELOPMENT;
		process.env.NODE_ENV = this.env;
	}

	setEnvKeys() {

		// In a normal app, production variables are set by server
		// For this task, I set variables here because there is no security issue
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