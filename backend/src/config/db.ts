import { Pool, PoolConfig } from 'pg';
import { config } from './env';

const isProduction = process.env.NODE_ENV === 'production';
const isRemoteDb = config.databaseUrl && !config.databaseUrl.includes('localhost') && !config.databaseUrl.includes('127.0.0.1');

const poolConfig: PoolConfig = {
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  options: '-c search_path=nlams,public',
  ssl: (isProduction || isRemoteDb) ? { rejectUnauthorized: false } : undefined,
};

export const pool = new Pool(poolConfig);

pool.on('error', (err) => {
  console.error('[DATABASE_POOL_ERROR]', err.message);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
