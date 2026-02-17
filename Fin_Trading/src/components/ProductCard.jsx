export const ProductCard=({ product })=> {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      background: 'white'
    }}>
      {/* Product Image (emoji) */}
      <div style={{
        fontSize: '48px',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
            <img 
              src={`https://robohash.org/${encodeURIComponent(product.name)}?size=100x100`} 
              alt={product.name}
              style={{ 
                width: '100px', 
                height: '100px',
                objectFit: 'contain' 
              }} 
            />
            
      </div>

      {/* Product Name */}
      <h3 style={{ 
        margin: '0 0 5px 0',
        fontSize: '16px'
      }}>
        {product.name}
      </h3>

      {/* Category */}
      <p style={{
        margin: '0 0 5px 0',
        fontSize: '12px',
        color: '#666'
      }}>
        {product.category}
      </p>

      {/* Price */}
      <p style={{
        margin: '0 0 10px 0',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#0066cc'
      }}>
        ₹{product.price}
      </p>

      {/* Rating */}
      <div style={{ marginBottom: '10px' }}>
        <span style={{ color: '#ff9900' }}>
          {'⭐'.repeat(Math.floor(product.rating))}
        </span>
        <span style={{ marginLeft: '5px', fontSize: '14px' }}>
          {product.rating}
        </span>
      </div>

      {/* Stock Status */}
      <p style={{
        margin: '0 0 10px 0',
        fontSize: '12px',
        color: product.inStock ? '#00cc00' : '#cc0000'
      }}>
        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
      </p>

      {/* Add to Cart Button */}
      <button 
        disabled={!product.inStock}
        style={{
          width: '100%',
          padding: '10px',
          background: product.inStock ? '#0066cc' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: product.inStock ? 'pointer' : 'not-allowed'
        }}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}

