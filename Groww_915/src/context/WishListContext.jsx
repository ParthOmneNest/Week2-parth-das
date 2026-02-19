import { createContext, useContext, useState, useEffect } from "react";

// Step 1: Create the context channel
const WishlistContext = createContext(null);

// Step 2: Create the Provider component
export function WishlistProvider({ children }) {
    
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved = localStorage.getItem('wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (err) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    
    const toggleWishlist = (productId) => {
        setWishlist((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    const isInWishlist = (productId) => wishlist.includes(productId);

    
    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

// Step 3: create the hook 
export function useWishlist() {
    return useContext(WishlistContext);
}
