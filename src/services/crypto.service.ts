import { apiClient } from './api.service';
import { ENDPOINTS } from '../config/api';
import { Crypto } from '../types/crypto';

export const cryptoService = {
  async getAll(): Promise<Crypto[]> {
    const { data } = await apiClient.get<Crypto[]>(ENDPOINTS.CRYPTO.LIST);
    return data;
  },

  async getById(id: string): Promise<Crypto> {
    const { data } = await apiClient.get<Crypto>(ENDPOINTS.CRYPTO.DETAILS(id));
    return data;
  },
};