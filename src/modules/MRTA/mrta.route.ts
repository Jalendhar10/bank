import express, { Router } from 'express';
// import { validate } from '../utils/validate';
// import { auth } from '../auth';
import { mrtaController } from './index';

const router: Router = express.Router();
router.post('/quote', mrtaController.createQuote);
router.post('/quote/finalize', mrtaController.finalizeQuote);

export default router;
