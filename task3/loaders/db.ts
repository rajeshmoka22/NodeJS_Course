import {sequelize} from '../config/dbconfig';
import { initModels } from './models';

export default async function (): Promise<void> {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }

  initModels();

  process.on('uncaughtException', error => {
    console.log(error.message);
  });
}
