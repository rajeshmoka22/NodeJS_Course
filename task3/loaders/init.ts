import {sequelize} from '../config/dbconfig';
import { initModels } from './models';
import { commonErrorLogger } from '../api/middleware/commonExceptionHandler';

export default async function (): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  initModels();

  process
  .on('unhandledRejection', (reason) => {
    commonErrorLogger.log('error',`Unhandled Rejection at Promise: ${reason}`);
  })
  .on('uncaughtException', error => {
    commonErrorLogger.log('error', error.message);
    process.exit(1);
  });
}
