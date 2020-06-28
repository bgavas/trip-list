const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { HEADER } = require('./../utils/constants');

class Swagger {

    constructor() {

        // swagger definition
        this.swaggerDefinition = {
            info: {
                title: 'Trip List Swagger',
                version: '1.0.0',
                description: 'Trip List Swagger',
            },
            host: process.env.API_URL.replace('http://', '').replace('https://', ''),
            basePath: '/',
            securityDefinitions: {
                jwt: {
                    type: 'apiKey',
                    description: 'JWT authorization token',
                    name: HEADER.AUTHORIZATION,
                    in: 'header',
                }
            },
            security: [
                { jwt: [] }
            ]
        };

        // Options for the swagger docs
        this.options = {
            // import swaggerDefinitions
            swaggerDefinition: this.swaggerDefinition,
            // path to the API docs
            apis: ['./server/controllers/*/*/*.js']
        };

        // initialize swagger-jsdoc
        this.swaggerSpec = swaggerJSDoc(this.options);

    }

    initialize(app) {

        // Swagger.json get
        app.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(this.swaggerSpec);
        });
    
        // Initialize ui
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));

    }

}

module.exports = Swagger;