export const FilterBar=({ filters, setFilter, resetFilters, categories })=>{
  return (
    <div style={{
      background: 'white',
      padding: '15px 20px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      marginBottom: '20px',
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      alignItems: 'flex-end'
    }}>

      {/* Category Dropdown */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold',
                        color: '#555', marginBottom: '5px' }}>
          CATEGORY
        </label>
        <select
          value={filters.category}
          onChange={(e) => setFilter('category', e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd',
                   fontSize: '14px', cursor: 'pointer' }}
        >
          <option value='all'>All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold',
                        color: '#555', marginBottom: '5px' }}>
          MAX PRICE: ${filters.maxPrice}
        </label>
        <input
          type='range'
          min='0' max='1000' step='10'
          value={filters.maxPrice}
          onChange={(e) => setFilter('maxPrice', Number(e.target.value))}
          style={{ width: '150px', cursor: 'pointer' }}
        />
      </div>

      {/* Sort Order */}
      <div>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold',
                        color: '#555', marginBottom: '5px' }}>
          SORT BY
        </label>
        <select
          value={filters.sortOrder}
          onChange={(e) => setFilter('sortOrder', e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd',
                   fontSize: '14px', cursor: 'pointer' }}
        >
          <option value='default'>Default</option>
          <option value='price-low'>Price: Low to High</option>
          <option value='price-high'>Price: High to Low</option>
          <option value='rating'>Highest Rated</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        style={{
          padding: '8px 16px', background: '#f0f0f0',
          border: '1px solid #ddd', borderRadius: '4px',
          cursor: 'pointer', fontSize: '14px'
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}