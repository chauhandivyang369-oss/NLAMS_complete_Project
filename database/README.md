# NLAMS Database — PostgreSQL 15+ with PostGIS 3.3+

## Schema Script
- **Master DDL Script:** `database/nlams_master_schema.sql`
- **Schema Name:** `nlams`
- **Required PostgreSQL Extensions:** `postgis`, `uuid-ossp`, `pgcrypto`

## Setting up in pgAdmin / PostgreSQL
1. Open pgAdmin 4.
2. Create a new database named `nlams_db`.
3. Open the **Query Tool** for `nlams_db`.
4. Open and execute `nlams_master_schema.sql`.
5. Verify installation by running:
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema='nlams';
```
You should see all master tables populated, along with the 50 pilot cadastral parcels for Petlad, Anand District, Gujarat.
