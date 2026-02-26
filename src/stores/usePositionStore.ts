import { create } from "zustand";
import { positions } from "../data/stockData";
import type { Position } from "../types/stock.types";

interface PositionStore {
  allPositions: Position[];
  compareList: Position[];
  addPosition:    (position: Position)                     => void;
  removePosition: (id: string)                              => void;
  updatePosition: (id: string, changes: Partial<Position>) => void;

  
  // Actions
  toggleCompare: (item: Position) => void;
  clearCompare:  () => void;
  isInCompare:   (id: string) => boolean;
}

export const usePositionStore = create<PositionStore>((set, get) => ({
  // ── Initial State ──────────────────────────────────────────────────
  allPositions: positions,
  compareList: [],

  // ── toggleCompare ──────────────────────────────────────────────────
  toggleCompare: (position) => {
    set((prev) => {
      const alreadyIn = prev.compareList.some((p) => p.id === position.id);

      if (alreadyIn) {
        return {
          compareList: prev.compareList.filter((p) => p.id !== position.id),
        };
      }

      if (prev.compareList.length >= 2) {
        alert("You can compare up to 2 positions at a time.");
        return prev;
      }

      return {
        compareList: [...prev.compareList, position],
      };
    });
  },

  // ── clearCompare ───────────────────────────────────────────────────
  clearCompare: () => set({ compareList: [] }),

  // ── isInCompare ────────────────────────────────────────────────────
  isInCompare: (id) => {
    return get().compareList.some((p) => p.id === id);
  },

      addPosition: function(position) {
      set(function(prev) {
        // Does this stock already have an open position?
        const existing = prev.allPositions.find(function(p) {
          return p.symbol === position.symbol;
        });

        if (existing) {
          // Merge: add quantities, recalculate average price
          return {
            allPositions: prev.allPositions.map(function(p) {
              if (p.symbol !== position.symbol) return p;
              const totalQty = p.Qty + position.Qty;
              const avgPrice = (
                (p.Avg_Price * p.Qty) +
                (position.Avg_Price * position.Qty)
              ) / totalQty;
              return { ...p, quantity: totalQty, avgPrice: avgPrice };
            }),
          };
        }

        // New position: just append it
        return { allPositions: [...prev.allPositions, position] };
      });
    },

    removePosition: function(id) {
      set(function(prev) {
        // filter() creates a NEW array without the matching item
        return {
          allPositions: prev.allPositions.filter(function(p) {
            return p.id !== id;
          }),
        };
      });
    },

    updatePosition: function(id, changes) {
      set(function(prev) {
        // map() creates a NEW array; only the matching item changes
        return {
          allPositions: prev.allPositions.map(function(p) {
            if (p.id !== id) return p;
            return { ...p, ...changes }; // merge changes into existing
          }),
        };
      })
    },
}))
