import { Router } from 'express';
import { GisController } from './gis.controller';

export const gisRouter = Router();

// ISRO Bhuvan WMS Reverse Proxy
gisRouter.get('/bhuvan-wms-proxy', GisController.bhuvanWmsProxy);

// Authoritative PostGIS Corridor Simulation & Slicing
gisRouter.post('/simulate-corridor', GisController.simulateCorridor);

// Parcel Search & Dossier
gisRouter.get('/parcels/search', GisController.searchParcels);
gisRouter.get('/parcels/:ulpin', GisController.getParcel);

// Bhuvan External Utilities
gisRouter.get('/bhuvan/village-geocoding', GisController.villageGeocoding);
gisRouter.get('/bhuvan/reverse-geocoding', GisController.reverseGeocoding);
gisRouter.post('/bhuvan/thematic-stats', GisController.thematicStats);
