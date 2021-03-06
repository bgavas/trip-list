module.exports = {

    AVAILABLE_VERSIONS: ['v1'], // Available REST service versions

    ENVIRONMENT: {
        TEST: 'test',
        DEVELOPMENT: 'development',
        PRODUCTION: 'production'
    },

    LANGUAGES : ['en', 'tr'],

    DEFAULT_LANGUAGE : 'tr',

    // Response headers
    HEADER: {
        AUTHORIZATION: 'authorization',
    },

    EXPIRATION: {
        JWT_TOKEN: 60 * 60 // in seconds
    },

    RESPONSE_STATUS: {
        FAIL: 'Fail',
        SUCCESS: 'Success',
        AUTHENTICATION_FAILED: 'Authentication fail',
        AUTHORIZATION_FAILED: 'Authorization fail'
    }

}