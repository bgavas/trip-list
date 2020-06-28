const { createLogger, format, transports } = require('winston');
const { colorize, combine, timestamp, simple } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        simple()
    ),
    transports: [
        new transports.Console({
            format: combine(
                colorize(),
                timestamp(),
                simple()
            )
        }),
    ],
});

module.exports = logger;