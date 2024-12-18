import { FavoritesService } from '../services/favorites.service.js';

const favoritesService = new FavoritesService();

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await favoritesService.getAll();
    res.json(favorites);
  } catch (error) {
    next(error);
  }
};

export const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    await favoritesService.add(id);
    res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    await favoritesService.remove(id);
    res.json({ message: 'Favorite removed successfully' });
  } catch (error) {
    next(error);
  }
};

export const checkFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isFavorite = await favoritesService.isFavorite(id);
    res.json({ isFavorite });
  } catch (error) {
    next(error);
  }
};
