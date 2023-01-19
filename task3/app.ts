import app from './loaders/express';
import { env } from './config/env';
import initDb from './loaders/db';

async function start() {
  await initDb();
  app.listen(env.app.port);
}

start();
