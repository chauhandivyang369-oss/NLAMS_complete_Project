import axios from 'axios';
import { pool } from '../../config/db';
import { Logger } from '../../utils/logger';

// 1x1 transparent PNG fallback buffer
const TRANSPARENT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// In-memory tile cache with 24-hour TTL
interface CachedTile {
  data: Buffer;
  contentType: string;
  cachedAt: number;
}
const tileCache = new Map<string, CachedTile>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export const STATUTORY_COLOR_MAP: Record<string, string> = {
  'Sec 23 Acquired': '#10b981',
  'SIA / Hearing': '#f59e0b',
  'Sec 11 Frozen': '#ef4444',
  'Govt Land': '#3b82f6',
  'Default': '#64748b'
};

export const GisService = {
  /**
   * ISRO Bhuvan WMS Reverse Proxy
   * Strips conflicting headers, caches tiles, provides resilient offline fallback
   */
  async fetchBhuvanTile(query: Record<string, any>): Promise<{ data: Buffer; contentType: string; fromCache: boolean }> {
    const serverNode = query.server === 'vec1'
      ? 'https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms'
      : 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms';

    const params = { ...query };
    delete params.server;

    // Cache key based on BBOX, LAYERS, WIDTH, HEIGHT, SRS
    const cacheKey = `${query.server || 'vec2'}_${params.LAYERS}_${params.BBOX}_${params.WIDTH || 256}`;
    const cached = tileCache.get(cacheKey);
    if (cached && (Date.now() - cached.cachedAt < CACHE_TTL_MS)) {
      return { data: cached.data, contentType: cached.contentType, fromCache: true };
    }

    try {
      const response = await axios.get(serverNode, {
        params,
        responseType: 'arraybuffer',
        timeout: 9000,
        headers: {
          'User-Agent': 'NLAMS-National-GIS-Platform/2026',
          'Accept': 'image/png,image/jpeg,*/*'
        }
      });

      const contentType = String(response.headers['content-type'] || 'image/png');
      const buffer = Buffer.from(response.data);

      // Cache tile
      tileCache.set(cacheKey, { data: buffer, contentType, cachedAt: Date.now() });

      return { data: buffer, contentType, fromCache: false };
    } catch (err: any) {
      Logger.warn(`Upstream ISRO Bhuvan timeout/unreachable: ${err.message}. Serving resilient fallback tile.`);
      return { data: TRANSPARENT_PNG, contentType: 'image/png', fromCache: false };
    }
  },

  /**
   * Authoritative PostGIS Corridor Simulation & Parcel Slicing
   * Uses ST_Buffer and ST_Intersection to slice cadastral parcels
   */
  async simulateCorridor(geometry: any, bufferMeters: number = 50) {
    let geojsonStr: string;

    if (typeof geometry === 'string') {
      geojsonStr = geometry;
    } else if (geometry && geometry.type) {
      geojsonStr = JSON.stringify(geometry);
    } else if (Array.isArray(geometry)) {
      // Array of coordinates [[lon, lat], [lon, lat]] or [[lat, lon], [lat, lon]]
      // Ensure longitude first for GeoJSON standard (72.x, 22.x)
      const coords = geometry.map(pt => {
        if (pt[0] < pt[1]) return [pt[1], pt[0]]; // was [lat, lon], convert to [lon, lat]
        return pt;
      });
      geojsonStr = JSON.stringify({
        type: 'LineString',
        coordinates: coords
      });
    } else {
      throw new Error('Invalid GeoJSON geometry provided');
    }

    const query = `
      WITH corridor_input AS (
        SELECT ST_SetSRID(ST_GeomFromGeoJSON($1), 4326) AS line_geom
      ),
      corridor_buf AS (
        SELECT ST_Buffer(line_geom::geography, $2)::geometry AS buf_geom FROM corridor_input
      ),
      intersected AS (
        SELECT
          p.ulpin,
          p.survey_no,
          p.village_name,
          p.taluka_name,
          p.district_name,
          p.state_name,
          p.total_area_acre,
          p.total_area_hectare,
          p.land_use,
          p.statutory_status,
          COALESCE(p.color_code, '#f59e0b') AS color_code,
          ROUND((ST_Area(ST_Intersection(p.geom, b.buf_geom)::geography) / 4046.856)::numeric, 2) AS affected_area_acre,
          ROUND(((ST_Area(ST_Intersection(p.geom, b.buf_geom)::geography) / ST_Area(p.geom::geography)) * 100)::numeric, 2) AS impact_pct,
          ST_AsGeoJSON(p.geom) AS parcel_geojson
        FROM nlams.cadastral_parcels p, corridor_buf b
        WHERE ST_Intersects(p.geom, b.buf_geom)
      )
      SELECT * FROM intersected ORDER BY affected_area_acre DESC;
    `;

    const result = await pool.query(query, [geojsonStr, bufferMeters]);
    const rawParcels = result.rows;

    // Fetch owners for all intersected parcels
    const ulpins = rawParcels.map(p => p.ulpin);
    let ownersMap: Record<string, any[]> = {};

    if (ulpins.length > 0) {
      const ownersRes = await pool.query(
        `SELECT ulpin, owner_name, relative_name, relationship_type, share_percentage, mobile_masked, bank_linked, is_disputed
         FROM nlams.land_owners
         WHERE ulpin = ANY($1::varchar[])`,
        [ulpins]
      );
      ownersRes.rows.forEach(o => {
        if (!ownersMap[o.ulpin]) ownersMap[o.ulpin] = [];
        ownersMap[o.ulpin].push({
          name: o.owner_name,
          relation: `${o.relationship_type || 'Relative'} of ${o.relative_name || 'N/A'}`,
          share: `${o.share_percentage}% Share`,
          mobileMasked: o.mobile_masked,
          bankLinked: o.bank_linked,
          isDisputed: o.is_disputed
        });
      });
    }

    // Process parcels and construct summary
    const affectedVillagesSet = new Set<string>();
    let totalAffectedAcres = 0;

    const parcels = rawParcels.map(p => {
      affectedVillagesSet.add(p.village_name);
      const affAcres = parseFloat(p.affected_area_acre) || 0;
      totalAffectedAcres += affAcres;

      let geomCoordinates = [];
      try {
        const parsed = JSON.parse(p.parcel_geojson);
        geomCoordinates = parsed.coordinates?.[0] || [];
      } catch (e) {
        // fallback
      }

      return {
        ulpin: p.ulpin,
        surveyNo: p.survey_no,
        survey_no: p.survey_no,
        village: p.village_name,
        village_name: p.village_name,
        taluka: p.taluka_name,
        district: p.district_name,
        state: p.state_name,
        totalAreaAcre: parseFloat(p.total_area_acre),
        total_area_acre: parseFloat(p.total_area_acre),
        areaHa: parseFloat(p.total_area_hectare),
        affectedAreaAcre: affAcres,
        impactPct: parseFloat(p.impact_pct),
        landUse: p.land_use,
        statutoryStatus: p.statutory_status,
        color: STATUTORY_COLOR_MAP[p.statutory_status] || p.color_code,
        owners: ownersMap[p.ulpin] || [],
        compensationStatus: p.statutory_status === 'Sec 23 Acquired' ? 'Awarded' : 'Pending',
        rnrStatus: p.impact_pct > 30 ? 'Applicable' : 'Partially Affected',
        selected: true,
        coordinates: geomCoordinates,
        parcelGeojson: p.parcel_geojson
      };
    });

    const summary = {
      selectedParcels: parcels.length,
      totalAreaAcres: parseFloat(totalAffectedAcres.toFixed(2)),
      affectedVillages: Array.from(affectedVillagesSet),
      bufferMeters,
      alignmentMatchPct: parcels.length > 0 ? 100 : 0
    };

    return { success: true, summary, parcels };
  },

  /**
   * Search Cadastral Parcels by ULPIN, Survey No, or Village
   */
  async searchParcels(queryStr: string) {
    const q = (queryStr || '').trim();
    const result = await pool.query(
      `SELECT p.ulpin, p.survey_no, p.village_name, p.taluka_name, p.district_name, p.state_name,
              p.total_area_acre, p.total_area_hectare, p.land_use, p.statutory_status, p.color_code,
              ST_AsGeoJSON(p.geom) AS parcel_geojson
       FROM nlams.cadastral_parcels p
       WHERE p.ulpin ILIKE $1 OR p.survey_no ILIKE $1 OR p.village_name ILIKE $1
       LIMIT 50`,
      [`%${q}%`]
    );

    return result.rows.map(r => ({
      ulpin: r.ulpin,
      surveyNo: r.survey_no,
      village: r.village_name,
      taluka: r.taluka_name,
      district: r.district_name,
      state: r.state_name,
      totalAreaAcre: parseFloat(r.total_area_acre),
      totalAreaHectare: parseFloat(r.total_area_hectare),
      landUse: r.land_use,
      statutoryStatus: r.statutory_status,
      colorCode: r.color_code,
      parcelGeojson: r.parcel_geojson
    }));
  },

  /**
   * Get single parcel with dossier and ownership details
   */
  async getParcelByUlpin(ulpin: string) {
    const parcelRes = await pool.query(
      `SELECT p.ulpin, p.survey_no, p.village_name, p.taluka_name, p.district_name, p.state_name,
              p.total_area_acre, p.total_area_hectare, p.land_use, p.statutory_status, p.color_code,
              ST_AsGeoJSON(p.geom) AS parcel_geojson
       FROM nlams.cadastral_parcels p
       WHERE p.ulpin = $1`,
      [ulpin]
    );

    if (!parcelRes.rows.length) return null;
    const p = parcelRes.rows[0];

    const ownersRes = await pool.query(
      `SELECT owner_id, khata_no, owner_name, relative_name, relationship_type, share_percentage, mobile_masked, bank_linked, is_disputed
       FROM nlams.land_owners
       WHERE ulpin = $1`,
      [ulpin]
    );

    return {
      ulpin: p.ulpin,
      surveyNo: p.survey_no,
      village: p.village_name,
      taluka: p.taluka_name,
      district: p.district_name,
      state: p.state_name,
      totalAreaAcre: parseFloat(p.total_area_acre),
      totalAreaHectare: parseFloat(p.total_area_hectare),
      landUse: p.land_use,
      statutoryStatus: p.statutory_status,
      colorCode: p.color_code,
      parcelGeojson: p.parcel_geojson,
      owners: ownersRes.rows.map(o => ({
        id: o.owner_id,
        name: o.owner_name,
        relativeName: o.relative_name,
        relation: o.relationship_type,
        share: `${o.share_percentage}%`,
        khataNo: o.khata_no,
        mobileMasked: o.mobile_masked,
        bankLinked: o.bank_linked,
        isDisputed: o.is_disputed
      }))
    };
  }
};
