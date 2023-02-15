import app from './loaders/express';
import { env } from './config/env';
import initAll from './loaders/init';

async function start() {
  await initAll();
  app.listen(env.app.port);
}

start();
