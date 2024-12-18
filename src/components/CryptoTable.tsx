import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Star, StarOff } from 'lucide-react';
import { Crypto } from '../types/crypto';
import { formatPrice, formatPercentage } from '../utils/formatters';

interface CryptoTableProps {
  cryptos: Crypto[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function CryptoTable({ cryptos, favorites, onToggleFavorite }: CryptoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Favorite</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cryptos.map((crypto) => (
            <tr key={crypto.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleFavorite(crypto.id)}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {favorites.has(crypto.id) ? (
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ) : (
                    <StarOff className="w-5 h-5" />
                  )}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                    <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatPrice(crypto.current_price)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`flex items-center text-sm ${
                  crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <ArrowUpCircle className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowDownCircle className="w-4 h-4 mr-1" />
                  )}
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}