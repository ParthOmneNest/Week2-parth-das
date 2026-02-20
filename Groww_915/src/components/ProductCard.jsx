import { useWishlist } from "../context/WishListContext";
import { useToggle } from "../hooks/useToggle";
export const ProductCard=({product,onViewDetails})=>{
   const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(product.id);

    const [showDesc,setShowDesc]=useToggle(false);

    const handleWishList=(e)=>{
      e.stopPropagation() // stops the click from reaching the card
      toggleWishlist(product.id)
    }
    const handleToggle=(e)=>{
      e.stopPropagation()
      setShowDesc()
    }
  return (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          background: 'white',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        
        onClick={() => onViewDetails(product.id)}
        >
          {/* Added the description button using custom hook useToggle */}
          <button onClick={handleToggle} 
          style={{fontSize:'17px',cursor:'pointer'}}>
            {showDesc ? '▲ Hide Description' : '▼ Show Description'}
          </button>
          {showDesc && <p style={{fontSize:'17px',color:'blue'}}>{product.description}</p>}

          <img
            src={product.image}
            alt={product.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'contain',
              marginBottom: '10px'
            }}
          />
          
          <h3 style={{
            fontSize: '14px',
            margin: '0 0 10px 0',
            height: '40px',
            overflow: 'hidden'
          }}>
            {product.title}
          </h3>
          
          <div style={{ marginBottom: '10px' }}>
            <span style={{ color: '#ff9900' }}>
              {'★'.repeat(Math.floor(product.rating.rate))}
            </span>
            <span style={{ marginLeft: '5px', fontSize: '12px', color: '#666' }}>
              ({product.rating.count})
            </span>
          </div>
          
          <p style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#0066cc',
            margin: 0
          }}>
            ${product.price}
          </p>
            <button style={ {cursor:'default'}} onClick={handleWishList}>
                {isLiked ? '❤️ Remove' : '🤍 Add to Wishlist'}
            </button>
        </div>
        )
    }