import {Sequelize} from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(env.db.uri as string, {
  define: {
    timestamps: false
  },
  query: {
    raw: true
  }
});
