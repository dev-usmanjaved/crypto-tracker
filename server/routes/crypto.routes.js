import express from 'express';
import { getCryptoList, getCryptoById } from '../controllers/crypto.controller.js';

const router = express.Router();

router.get('/', getCryptoList);
router.get('/:id', getCryptoById);

export { router as cryptoRoutes };