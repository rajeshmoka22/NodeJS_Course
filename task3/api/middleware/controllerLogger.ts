/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from "winston";
import { performance } from "perf_hooks";

const consoleLog = new winston.transports.Console();
const {combine, timestamp, printf, colorize} = winston.format;
const loggerConfig = {
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY/MMM/DD HH:mm:ss' }),
    printf((info:any) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [consoleLog],
  level: 'debug'
}
export const logger = winston.createLogger(loggerConfig);

// this calculates and logs the execution time of each api call and errors, if any.
export function ControllerLogger() {
  return function decoratorFn(_target: any, fnName: string, Func: PropertyDescriptor): void {
    const methodToBeCalled = Func.value;
    Func.value = async (...args: any): Promise<void> => {
      try {
        const t1 = performance.now();
        const context: any = this as any;
        await methodToBeCalled.apply(context, args);
        const executionTime = (performance.now() - t1).toFixed(2);
        logger.debug(`[${fnName}] - execution time: ${executionTime} ms`);
      } catch (error) {
        logger.error(`[${fnName}] - Something went wrong: ${error.message}`);
        throw new Error(error);
      }
    };
  };
}
