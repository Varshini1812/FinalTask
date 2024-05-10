import * as winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import morgan, { StreamOptions } from 'morgan';
import { Express } from 'express';

let logDir = path.resolve(
    __dirname,
    /[\\\/]dist[\\\/]src[\\\/]utils([\\\/]?)$/i.test(__dirname) ? '../../logs' : '../../dist/logs'
);

let logObject = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        }),
        new winston.transports.DailyRotateFile({
            format: winston.format.combine(winston.format.uncolorize(), winston.format.json()),
            filename: 'application-%DATE%.log',
            dirname: logDir,
            maxSize: '20m',
            maxFiles: '14d',
            datePattern: 'YYYY-MM-DD',
        }),
    ],
});

export type LogFnType = (m: string, ...meta: any[]) => void;
export type LoggerType = {
    info: LogFnType,
    warn: LogFnType,
    error: LogFnType,
}

function setUpLogger(logger: winston.Logger): LoggerType {
    return {
        info: (message: string, ...meta: any[]) => logger.log('info', message, meta),
        warn: (message: string, ...meta: any[]) => logger.log('warn', message, meta),
        error: (message: string, ...meta: any[]) => logger.log('error', message, meta),
    };
}

let logger = setUpLogger(logObject);

export function setUpMorgan(app: Express) {
    let stream: StreamOptions = {
        write: (x) => logger.info(x)
    };

    app.use(morgan("dev", {
        stream: stream
    }));
}

export { logger }