import winston from "winston";
import expressWinston from "express-winston";

/**
 * Winston logger to converts console logs to custom format.
 * It could be used to store logs in folders or sending them to remote servers like ELK OR use filebeat.
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `[${info?.level?.toUpperCase()}]: ${[info.timestamp]}: ${info.message}`),
    ),
});

/**
 * Winston logger to add as middleware to express request, response cycle.
 * For every request it will be automatically logged with timestamp response time etc...
 */
const loggerMiddleware = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss'
        }),
        winston.format.json()
    ),
    msg: "HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    meta: false,
});

export { logger, loggerMiddleware };