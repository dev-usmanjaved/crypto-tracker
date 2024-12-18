import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export class CryptoService {
  async getAll() {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw new Error('Failed to fetch cryptocurrency data');
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${COINGECKO_API}/coins/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch cryptocurrency details');
    }
  }
}
