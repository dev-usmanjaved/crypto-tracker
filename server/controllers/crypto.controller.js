import { CryptoService } from '../services/crypto.service.js';

const cryptoService = new CryptoService();

export const getCryptoList = async (req, res, next) => {
  try {
    const cryptos = await cryptoService.getAll();
    res.json(cryptos);
  } catch (error) {
    next(error);
  }
};

export const getCryptoById = async (req, res, next) => {
  try {
    const crypto = await cryptoService.getById(req.params.id);
    if (!crypto) {
      return res.status(404).json({ message: 'Cryptocurrency not found' });
    }
    res.json(crypto);
  } catch (error) {
    next(error);
  }
};