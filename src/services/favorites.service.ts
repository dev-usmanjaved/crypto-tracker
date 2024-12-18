import { apiClient } from './api.service';
import { ENDPOINTS } from '../config/api';

export const favoritesService = {
  async getAll(): Promise<string[]> {
    const { data } = await apiClient.get<string[]>(ENDPOINTS.FAVORITES.LIST);
    return data;
  },

  async add(id: string): Promise<void> {
    await apiClient.post(ENDPOINTS.FAVORITES.ADD(id));
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(ENDPOINTS.FAVORITES.REMOVE(id));
  },
};