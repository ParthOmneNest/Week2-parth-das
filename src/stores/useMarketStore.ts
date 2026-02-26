import { create } from 'zustand';
import type { MarketIndex } from '../types/stock.types';

interface MarketStore {
  indices: MarketIndex[];
  isLoading: boolean;
  // Actions
  setIndices: (data: MarketIndex[]) => void;
  updateIndexPrice: (symbol: string, newPrice: number) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  // Initial State (You can put mock data here or start empty)
  indices: [
    { id: '1', symbol: 'S&P 500', price: 5022.31, change: 12.5, changePct: 0.25 },
    { id: '2', symbol: 'NASDAQ', price: 15990.25, change: -45.1, changePct: -0.28 },
    { id: '3', symbol: 'DOW J', price: 38622.12, change: 88.4, changePct: 0.23 },
    { id: '4', symbol: 'FTSE 100', price: 7597.53, change: 5.2, changePct: 0.07 },
    { id: '5', symbol: 'NIFTY 50', price: 22212.70, change: -15.3, changePct: -0.07 },
  ],
  isLoading: false,

  setIndices: (data) => set({ indices: data }),

  updateIndexPrice: (symbol, newPrice) => set((state) => ({
    indices: state.indices.map((item) => {
      if (item.symbol !== symbol) return item;
      
      const oldPrice = item.price;
      const change = newPrice - oldPrice;
      const changePct = (change / oldPrice) * 100;

      return { ...item, price: newPrice, change, changePct };
    })
  }))
}));
