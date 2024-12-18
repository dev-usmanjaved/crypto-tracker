export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'price' | 'priceChange';