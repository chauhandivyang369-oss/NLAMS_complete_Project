import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:postgresql369@localhost:5432/NLAMS_Database',
  jwtSecret: process.env.JWT_SECRET || 'nlams-super-secret-jwt-key-2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || 'zola.johnston55@ethereal.email',
    pass: process.env.SMTP_PASS || '52E6BZxcscNrbAJrka',
    from: process.env.SMTP_FROM || process.env.EMAIL_FROM || 'NLAMS <no-reply@nlams.gov.in>'
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || ''
  }
};
