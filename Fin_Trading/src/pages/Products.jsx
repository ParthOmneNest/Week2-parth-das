import { products } from '../utils/products';
import { ProductCard } from '../components/ProductCard';
import { Logic } from '../components/Sort&Filter/Logic.js';
import { Filter } from '../components/Sort&Filter/Filter';
export const Products=()=> {
    const [sortBy,setSortBy,sortedProducts] = Logic(products)

  return (
    <div style={{ padding: '20px' }}>
      <h1>E-commerce Product Catalog</h1>
      
    <Filter sortBy={sortBy} setSortBy={setSortBy}/>
      {/* Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
