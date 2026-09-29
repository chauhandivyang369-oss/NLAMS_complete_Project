import { Router } from 'express';
import { AiController } from './ai.controller';

export const aiRouter = Router();

// Bhumi Mitra Statutory Legal RAG (Accessible to citizens and officers)
aiRouter.post('/rag/query', AiController.queryRag);

// Form-I Multimodal OCR & Field Extractor
aiRouter.post('/ocr/extract-form-1', AiController.extractForm1);

// Statutory SLA & Bottleneck Predictor
aiRouter.get('/predict/bottleneck', AiController.predictBottleneck);
aiRouter.post('/predict/bottleneck', AiController.predictBottleneck);
