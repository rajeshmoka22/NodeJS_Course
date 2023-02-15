import winston from "winston";
import { Request, Response, NextFunction } from 'express';

const consoleLog = new winston.transports.Console();
const {combine, timestamp, printf, colorize} = winston.format;
const loggerConfig = {
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY/MMM/DD HH:mm:ss' }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    printf((info:any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [consoleLog],
  level: 'info'
}
export const logger = winston.createLogger(loggerConfig);
export function apiLogger(req: Request, _res: Response, next: NextFunction): void {
  const { method, path, params, query, body } = req;
  const message = `[${method}] - action: '${path}', params: ${JSON.stringify(params)}, query: ${JSON.stringify(query)}, body: ${JSON.stringify(body)}`;
  logger.info(message);
  next();
}
