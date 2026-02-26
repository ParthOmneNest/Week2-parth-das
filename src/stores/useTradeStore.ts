import { create } from 'zustand';
import type { Position, Trade } from '../types/stock.types';
import { trades } from '../data/stockData';

type NewTradeInput = Omit<Trade, 'id' | 'date'>;

interface TradeStore {
  tradeHistory: Trade[];
  positions:Position[]
  addTrade: (input: NewTradeInput) => void;
}

export const useTradeStore = create<TradeStore>(function(set) {
  return {

    tradeHistory: trades,
    positions:[],
    addTrade: function(input) {

      const newTrade: Trade = {
        ...input,              
        id: `t${Date.now()}`, 
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      };

    
      set(function(prev) {
        return {
          tradeHistory: [newTrade, ...prev.tradeHistory]
          // newTrade goes first so it goes to top
        };
      });
    },

  };
});
