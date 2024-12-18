export const API_BASE_URL = 'http://localhost:3000/api';

export const ENDPOINTS = {
  CRYPTO: {
    LIST: `${API_BASE_URL}/crypto`,
    DETAILS: (id: string) => `${API_BASE_URL}/crypto/${id}`,
  },
  FAVORITES: {
    LIST: `${API_BASE_URL}/favorites`,
    ADD: (id: string) => `${API_BASE_URL}/favorites/${id}`,
    REMOVE: (id: string) => `${API_BASE_URL}/favorites/${id}`,
  },
} as const;
