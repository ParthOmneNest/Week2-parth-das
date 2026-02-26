import { create } from 'zustand';
import type { Stock } from '../types/stock.types';

// The data shape (same fields that were in local useState before)
interface PortfolioState {
  holdings:   Stock[];
  totalValue: number;
  gainLoss:   number;
  isLoading:  boolean;
  error:      string | null;
}

// The full store = PortfolioState + the loadPortfolio action
interface PortfolioStore extends PortfolioState {
  loadPortfolio: (availableStocks: Stock[]) => void;
}

export const usePortfolioStore = create<PortfolioStore>(function(set) {
  return {

    // Starting values — same as the old useState({}) defaults
    holdings:   [],
    totalValue: 0,
    gainLoss:   0,
    isLoading:  true,   // starts loading
    error:      null,

    loadPortfolio: function(availableStocks) {

      // Show a loading state first
      set({ isLoading: true, error: null });

      // Simulate a network call with setTimeout
      // (same 800ms delay as the original useEffect)
      setTimeout(function() {
        try {
          const topThree   = availableStocks.slice(0, 3);
          const totalValue = topThree.reduce(function(sum, s) {
            return sum + s.price * 10;
          }, 0);
          const totalCost  = topThree.reduce(function(sum, s) {
            return sum + (s.price - s.change) * 10;
          }, 0);

          set({
            holdings:   topThree,
            totalValue: totalValue,
            gainLoss:   totalValue - totalCost,
            isLoading:  false,
            error:      null,
          });
        } catch (err) {
          set({ isLoading: false, error: 'Failed to load portfolio.' });
        }
      }, 800);
    },
  };
});
