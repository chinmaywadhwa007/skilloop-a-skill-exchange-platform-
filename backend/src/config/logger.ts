import pino from 'pino';
import { env } from './env.js';

export const loggerConfig =
  env.NODE_ENV === 'development'
    ? {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : {
        level: 'info',
      };

export const logger = pino(loggerConfig);
