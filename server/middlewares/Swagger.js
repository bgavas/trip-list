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

    initialize(api) {

        // Swagger.json get
        api.get('/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(this.swaggerSpec);
        });
    
        // Initialize ui
        api.use('/swagger', swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));

    }

}

module.exports = Swagger;