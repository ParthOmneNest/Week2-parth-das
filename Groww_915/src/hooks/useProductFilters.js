import { useMemo, useState } from "react";

const DEFAULT_FILTERS = {
  category:  'all',
  minPrice:  0,
  maxPrice:  1000,
  sortOrder: 'default'   // 'default' | 'price-low' | 'price-high' | 'rating'
};
export function useProductFilters(products) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Update ONE filter at a time without resetting others
  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset all filters back to defaults
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // useMemo re-calculates only when products or filters change
  const sortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by category
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // 2. Filter by price range
    result = result.filter(
      p => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    // 3. Sort
    switch (filters.sortOrder) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;   // keep original API order
    }

    return result;
  }, [products, filters]);

  return { filters, setFilter, sortedProducts, resetFilters };
}