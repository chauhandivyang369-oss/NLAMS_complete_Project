import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { pool } from './config/db';
import { Logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';

import { authRouter } from './modules/auth/auth.routes';
import { gisRouter } from './modules/gis/gis.routes';
import { requisitionRouter } from './modules/requisitions/requisition.routes';
import { collectorRouter } from './modules/collector/collector.routes';
import { notificationRouter } from './modules/notifications/notification.routes';
import { aiRouter } from './modules/ai/ai.routes';
import { appropriateGovtRouter } from './modules/appropriateGovt/appropriateGovt.routes';
import { siaRouter } from './modules/siaIeg/siaIeg.routes';
import { rnrRouter } from './modules/rnr/rnr.routes';
import { larrRouter } from './modules/larr/larr.routes';
import { financeRouter } from './modules/finance/finance.routes';
import { citizenRouter } from './modules/citizen/citizen.routes';

export const app: Application = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman) or matching FRONTEND_URL or localhost
    if (!origin || origin === config.frontendUrl || origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev/testing mode
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id']
}));

// Body Parsers (support large GeoJSON corridor payloads up to 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Correlation ID & Request Logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-request-id'] as string) || 
    `req-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  req.headers['x-request-id'] = correlationId;
  res.setHeader('X-Request-Id', correlationId);

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    Logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`, undefined, correlationId);
  });
  next();
});

// Root & Health Endpoints
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'National Land Acquisition & Management System (NLAMS) API',
    version: '1.0.0',
    statutoryFramework: 'RFCTLARR Act 2013',
    status: 'ONLINE',
    workspaces: 8,
    documentation: '/api/v1/docs'
  });
});

app.get('/health', async (_req: Request, res: Response) => {
  try {
    const dbRes = await pool.query('SELECT NOW() AS now, PostGIS_Version() AS postgis');
    res.json({
      status: 'HEALTHY',
      database: 'CONNECTED',
      postgis: dbRes.rows[0].postgis,
      serverTime: dbRes.rows[0].now,
      uptime: process.uptime()
    });
  } catch (err: any) {
    Logger.error('Health check failed', err);
    res.status(503).json({
      status: 'DEGRADED',
      database: 'DISCONNECTED',
      error: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// =============================================================================
// API V1 Route Mounts (All 8 Workspaces + Citizen Portal + Spatial Services)
// =============================================================================
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/gis', gisRouter);
app.use('/api/v1/requisitions', requisitionRouter);
app.use('/api/v1/collector', collectorRouter);
app.use('/api/v1/appropriate-govt', appropriateGovtRouter);
app.use('/api/v1/sia', siaRouter);
app.use('/api/v1/rnr', rnrRouter);
app.use('/api/v1/larr-tribunal', larrRouter);
app.use('/api/v1/finance', financeRouter);
app.use('/api/v1/citizen', citizenRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/ai', aiRouter);

// Global Error Handler
app.use(errorHandler);
