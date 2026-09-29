/**
 * Universal Geographic Search Service for NLAMS GIS Studio
 * 3-Tier Routing Architecture as per PDF Section 6:
 * Tier 1: 14-Digit Standard ULPIN resolution
 * Tier 2: Survey / Khasra number pattern lookup
 * Tier 3: Nominatim OpenStreetMap Geocoder (Village, Taluka, City, NH)
 */
import axios from 'axios';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search';

export async function universalSearch(query, localParcels = []) {
  if (!query || typeof query !== 'string') return null;
  const trimmed = query.trim();

  // Tier 1 & 2: Check against local cadastral parcels first
  // Regex: 14-digit ULPIN or Survey No (e.g., 142/A, 143)
  const isUlpin = /^\d{14}$/.test(trimmed);
  const isSurvey = /^(\d+([A-Za-z0-9\/\-_]+)?)$/i.test(trimmed);

  if (isUlpin || isSurvey) {
    const matchedParcel = localParcels.find(p => 
      (p.ulpin && p.ulpin.toLowerCase() === trimmed.toLowerCase()) ||
      (p.surveyNo && p.surveyNo.toLowerCase() === trimmed.toLowerCase()) ||
      (p.survey_no && p.survey_no.toLowerCase() === trimmed.toLowerCase())
    );

    if (matchedParcel) {
      return {
        type: 'PARCEL',
        source: 'LOCAL_POSTGIS',
        data: matchedParcel,
        center: matchedParcel.coordinates ? matchedParcel.coordinates[0] : [22.5421, 72.9281],
        title: `Survey No. ${matchedParcel.surveyNo || matchedParcel.survey_no} (${matchedParcel.ulpin})`,
        subtitle: `${matchedParcel.village || matchedParcel.village_name}, ${matchedParcel.taluka || matchedParcel.district}`
      };
    }
  }

  // Also check village name in local parcels
  const matchedVillage = localParcels.filter(p => 
    (p.village && p.village.toLowerCase().includes(trimmed.toLowerCase())) ||
    (p.village_name && p.village_name.toLowerCase().includes(trimmed.toLowerCase()))
  );
  if (matchedVillage.length > 0) {
    return {
      type: 'VILLAGE_LOCAL',
      source: 'LOCAL_CADASTRE',
      parcels: matchedVillage,
      center: matchedVillage[0].coordinates ? matchedVillage[0].coordinates[0] : [22.5421, 72.9281],
      title: `Village: ${matchedVillage[0].village || matchedVillage[0].village_name}`,
      subtitle: `${matchedVillage.length} parcels in acquisition zone`
    };
  }

  // Tier 3: Nominatim Indian Geocoder
  try {
    const res = await axios.get(NOMINATIM_BASE, {
      params: {
        q: trimmed,
        format: 'json',
        polygon_geojson: 1,
        countrycodes: 'in',
        limit: 5
      },
      headers: {
        'User-Agent': 'NLAMS-National-GIS-Platform/2026'
      },
      timeout: 4000
    });

    if (res.data && res.data.length > 0) {
      const top = res.data[0];
      return {
        type: 'GEOGRAPHIC',
        source: 'NOMINATIM',
        display_name: top.display_name,
        lat: parseFloat(top.lat),
        lon: parseFloat(top.lon),
        boundingbox: top.boundingbox ? top.boundingbox.map(Number) : null,
        geojson: top.geojson || null
      };
    }
  } catch (err) {
    console.warn('[Universal Search] Nominatim lookup fallback:', err.message);
  }

  // Safe fallback for Petlad corridor pilot
  if (trimmed.toLowerCase().includes('petlad') || trimmed.toLowerCase().includes('anand')) {
    return {
      type: 'PILOT_FALLBACK',
      source: 'LOCAL_CACHE',
      display_name: 'Petlad, Anand District, Gujarat, India',
      lat: 22.5421,
      lon: 72.9281
    };
  }

  return null;
}
