/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv';

const dtEnv = dotenv.config();
if (dtEnv.error) {
  throw new Error(dtEnv.error.message);
}

export const env: Record<string, Record<string, string|number>> = {
  db: {
    uri: process.env.DB_URI!
  },
  app: {
    port: 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET!
  }
}
