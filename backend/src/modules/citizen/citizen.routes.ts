import { Router } from 'express';
import { CitizenController } from './citizen.controller';

export const citizenRouter = Router();

// Public / Citizen endpoints
citizenRouter.get('/my-parcels', CitizenController.getMyParcels);
citizenRouter.post('/file-objection', CitizenController.fileObjection);
citizenRouter.get('/dbt-passbook/:ownerId', CitizenController.getDbtPassbook);
citizenRouter.get('/public-gazettes', CitizenController.getPublicGazettes);
citizenRouter.post('/bhumi-mitra/query', CitizenController.bhumiMitraQuery);
