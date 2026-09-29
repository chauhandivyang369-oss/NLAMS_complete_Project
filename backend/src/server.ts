import { app } from './app';
import { config } from './config/env';
import { pool } from './config/db';
import { Logger } from './utils/logger';

const server = app.listen(config.port, async () => {
  Logger.info(`=======================================================`);
  Logger.info(`  NLAMS Backend Server is running on port ${config.port}`);
  Logger.info(`  Target Database: ${config.databaseUrl.replace(/:[^:@]+@/, ':***@')}`);
  Logger.info(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  Logger.info(`=======================================================`);

  try {
    const res = await pool.query('SELECT NOW() AS current_time, PostGIS_Version() AS postgis_ver');
    Logger.info(`Database connectivity verified. Server time: ${res.rows[0].current_time}`);
    Logger.info(`PostGIS Version: ${res.rows[0].postgis_ver}`);
  } catch (err: any) {
    Logger.error(`Initial database connection test failed: ${err.message}`, err);
  }
});

// Graceful Shutdown
const shutdown = async (signal: string) => {
  Logger.info(`Received ${signal}. Shutting down NLAMS server gracefully...`);
  server.close(async () => {
    Logger.info('HTTP server closed.');
    try {
      await pool.end();
      Logger.info('PostgreSQL pool drained.');
      process.exit(0);
    } catch (err: any) {
      Logger.error('Error during pool draining:', err);
      process.exit(1);
    }
  });

  setTimeout(() => {
    Logger.error('Forcing server shutdown due to timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

export default server;
