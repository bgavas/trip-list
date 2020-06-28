const mongoose = require('mongoose');
const logger = require('./../utils/logger');

/** @type {mongoose} */
let _connection;

class Database {

    static get connection() { return _connection; }
    static set connection(c) { _connection = c }

    constructor() {}

    createConnection() {

        // Connect
        return mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            // Connection success
            .then(c => {
                // Set static connection
                _connection = c;
                logger.info('Database connection has been established successfully.');
            })
            // Connection failed
            .catch(err => logger.error('Unable to connect to the database:', err));


    }

    setModels() {
        const models = require('./../models');
        this.models = models.models;
    }

}

// Export
module.exports = Database;