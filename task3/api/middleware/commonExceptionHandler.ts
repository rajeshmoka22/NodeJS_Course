import winston from "winston";

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
  level: 'error'
}
export const commonErrorLogger = winston.createLogger(loggerConfig);
