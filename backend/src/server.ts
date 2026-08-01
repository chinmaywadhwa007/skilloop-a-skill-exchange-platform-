import { buildApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function start() {
  const app = await buildApp();

  try {
    await connectDatabase();
    app.log.info('✅ Database connected');

    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(`🚀 SkillLoop API running at http://localhost:${env.PORT}${env.API_PREFIX}`);
    app.log.info(`📚 Swagger docs at http://localhost:${env.PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    app.log.info(`${signal} received. Shutting down gracefully...`);
    await app.close();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();
