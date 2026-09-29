import { Router } from 'express';
import { SiaIegController } from './siaIeg.controller';
import { authenticateToken } from '../../middleware/auth';
import { verify3DRBAC } from '../../middleware/rbac';

export const siaRouter = Router();

siaRouter.post(
  '/launch-survey',
  authenticateToken,
  verify3DRBAC('LAUNCH_SIA', ['sia-ieg', 'central-appropriate-gov', 'state-appropriate-gov', 'ADMIN']),
  SiaIegController.launchSurvey
);

siaRouter.get('/survey-data/:surveyId', SiaIegController.getSurveyData);

siaRouter.post(
  '/public-hearings',
  authenticateToken,
  verify3DRBAC('SCHEDULE_SIA_HEARING', ['sia-ieg', 'ADMIN']),
  SiaIegController.scheduleHearing
);

siaRouter.post(
  '/simp-plan',
  authenticateToken,
  verify3DRBAC('CREATE_SIMP', ['sia-ieg', 'ADMIN']),
  SiaIegController.createSimpItem
);

siaRouter.get('/ieg/appraisal/:surveyId', SiaIegController.getIegAppraisal);

siaRouter.post(
  '/ieg/submit-recommendation',
  authenticateToken,
  verify3DRBAC('SUBMIT_IEG_RECOMMENDATION', ['sia-ieg', 'ADMIN']),
  SiaIegController.submitIegRecommendation
);
