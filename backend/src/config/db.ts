import { Pool, PoolConfig } from 'pg';
import { config } from './env';

const poolConfig: PoolConfig = {
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  options: '-c search_path=nlams,public',
};

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('[DATABASE_POOL_ERROR]', err.message);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
