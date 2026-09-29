# NLAMS Backend — Node.js & Express REST API Engine

This directory contains the production Node.js + Express + TypeScript backend for the **National Land Acquisition & Management System (NLAMS)**.

## Architecture & Code Guidelines
- Refer to `docs/BACKEND_ARCHITECTURE_AND_CODE_PATTERNS.md` for exact route controllers, PostGIS queries, and 3D-RBAC middleware.
- Refer to `database/nlams_master_schema.sql` for the active PostgreSQL DDL.
- Refer to `docs/NLAMS_API_SPECIFICATION.md` for the complete API directory.

## Getting Started
```bash
npm install
npm run dev
```

## Environment Variables
Ensure `.env` in repository root has:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nlams_db
FRONTEND_URL=http://localhost:3000
JWT_SECRET=super-secret-key-change-in-production
```
