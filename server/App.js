const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { AVAILABLE_VERSIONS } = require('./utils/constants');
const logger = require('./utils/logger');
const Database = require('./databases/Database');
const Default = require('./middlewares/Default');
const Result = require('./middlewares/Result');
const Swagger = require('./middlewares/Swagger');
const routes = require('./routes/index');

class App {

    constructor() {

        // Create api
        this.api = express();
        this.swagger = new Swagger();

        // Fetch port
        this.port = process.env.PORT;

    }

    connectToDatabase() {

        // Connect to database
        this.database = new Database();
        this.database.createConnection();
        this.database.setModels();
        
    }

    initializeMiddleware() {

        // Api middlewares
        this.api.enable('trust proxy');
        this.api.use(helmet());
        this.api.use(bodyParser.json());

        // Swagger
        this.swagger.initialize(this.api);
        // Default
        this.api.use((req, res, next) => new Default(req, res, next));
        // Routes
        this.initializeRoutes();
        // Result
        this.api.use((result, req, res, next) => new Result(result, req, res, next));

    }

    initializeRoutes() {

        // Dummy route for raw url
        this.api.get('/', (req, res) => res.status(200).send('Trip List: Running'));

        // Define routes
        Object.keys(routes).forEach(key => {
            // Versioning
            AVAILABLE_VERSIONS.forEach(version => {
                const route = new routes[key]();
                this.api.use(`/api/${version}/` + key, route.init(version));
            });
        });
        
    }

    startServer() {
        // Start server
        this.api.listen(this.port, () => {
            logger.info('App started at PORT: ' + this.port);
        });
    }
    
}

module.exports = App;