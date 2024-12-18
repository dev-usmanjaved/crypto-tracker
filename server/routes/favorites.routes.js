import express from 'express';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite
} from '../controllers/favorites.controller.js';

const router = express.Router();

router.get('/', getFavorites);
router.post('/:id', addFavorite);
router.delete('/:id', removeFavorite);
router.get('/:id/check', checkFavorite);

export { router as favoriteRoutes };
