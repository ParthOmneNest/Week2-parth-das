import { useState } from "react";
export const Logic=(products)=>{
    const [sortBy, setSortBy] = useState('default');

    const getSortedProducts = (items) => {

    // Always spread to avoid mutating the original array
    const copy = [...items];

    if (sortBy === 'price-low-high') {
      return copy.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'price-high-low') {
      return copy.sort((a, b) => b.price - a.price);
    }

    if (sortBy === 'name-az') {
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'rating') {
      return copy.sort((a, b) => b.rating - a.rating);
    }

    return copy; // default — original order
  };

  const sortedProducts=getSortedProducts(products)
    // Default: return original order
    return [
        sortBy,
        setSortBy,
        sortedProducts
    ];

}