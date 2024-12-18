import { useState, useEffect, useCallback } from 'react';
import { favoritesService } from '../services/favorites.service';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    try {
      const data = await favoritesService.getAll();
      setFavorites(new Set(data));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch favorites');
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback(async (id: string) => {
    try {
      if (favorites.has(id)) {
        await favoritesService.remove(id);
        setFavorites(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        await favoritesService.add(id);
        setFavorites(prev => new Set(prev).add(id));
      }
    } catch (err) {
      setError('Failed to update favorites');
    }
  }, [favorites]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, error, toggleFavorite };
}