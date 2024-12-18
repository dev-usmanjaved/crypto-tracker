import { useState } from 'react';
import { Coins } from 'lucide-react';
import { useCryptoData } from './hooks/useCryptoData';
import { useFavorites } from './hooks/useFavorites';
import { CryptoTable } from './components/CryptoTable';
import { SearchBar } from './components/SearchBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner } from './components/LoadingSpinner';

export function App() {
  const { cryptos, loading: cryptosLoading, error: cryptosError } = useCryptoData();
  const { favorites, toggleFavorite, loading: favoritesLoading } = useFavorites();
  const [search, setSearch] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredCryptos = cryptos.filter((crypto) => {
    const matchesSearch = crypto.name.toLowerCase().includes(search.toLowerCase()) ||
                        crypto.symbol.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = !showOnlyFavorites || favorites.has(crypto.id);
    return matchesSearch && matchesFavorites;
  });

  if (cryptosLoading || favoritesLoading) {
    return <LoadingSpinner />;
  }

  if (cryptosError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{cryptosError}</p>
          <p className="mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Coins className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Crypto Price Tracker</h1>
          </div>
        </div>

        <ErrorBoundary>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <div className="w-full sm:w-96">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={showOnlyFavorites}
                    onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                  />
                  <span className="ml-2 text-gray-700">Show favorites only</span>
                </label>
              </div>
            </div>

            <CryptoTable
              cryptos={filteredCryptos}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
