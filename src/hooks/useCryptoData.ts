import { useState, useEffect } from 'react';
import { Crypto } from '../types/crypto';
import { cryptoService } from '../services/crypto.service';

export function useCryptoData() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cryptoService.getAll();
        setCryptos(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); 

    return () => clearInterval(interval);
  }, []);

  return { cryptos, loading, error };
}
