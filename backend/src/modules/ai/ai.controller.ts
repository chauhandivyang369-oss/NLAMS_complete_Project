import { Request, Response } from 'express';
import { AiService } from './ai.service';
import { Logger } from '../../utils/logger';

export const AiController = {
  /**
   * POST /api/v1/ai/rag/query
   * Bhumi Mitra Legal Statutory Advisory RAG
   */
  async queryRag(req: Request, res: Response) {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_PAYLOAD', message: 'Inquiry query string is required' }
      });
    }

    try {
      const response = await AiService.queryBhumiMitra(query);
      return res.json(response);
    } catch (err: any) {
      Logger.error('RAG query error', err);
      return res.status(500).json({
        success: false,
        error: { code: 'AI_SERVICE_ERROR', message: err.message }
      });
    }
  },

  /**
   * POST /api/v1/ai/ocr/extract-form-1
   * Multimodal Form-I OCR & Field Extractor
   */
  async extractForm1(req: Request, res: Response) {
    try {
      const result = await AiService.extractForm1Ocr({
        rawText: req.body?.rawText,
        filename: req.body?.filename,
        mimeType: req.body?.mimeType
      });
      return res.json(result);
    } catch (err: any) {
      Logger.error('OCR extraction error', err);
      return res.status(500).json({
        success: false,
        error: { code: 'OCR_SERVICE_ERROR', message: err.message }
      });
    }
  },

  /**
   * GET / POST /api/v1/ai/predict/bottleneck
   * Statutory SLA & Delay Predictor
   */
  async predictBottleneck(req: Request, res: Response) {
    const projectId = req.query.projectId || req.body.projectId;
    try {
      const result = await AiService.predictBottlenecks(projectId ? Number(projectId) : undefined);
      return res.json(result);
    } catch (err: any) {
      Logger.error('Predict bottleneck error', err);
      return res.status(500).json({
        success: false,
        error: { code: 'PREDICTION_ERROR', message: err.message }
      });
    }
  }
};
