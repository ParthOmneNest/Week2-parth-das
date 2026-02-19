import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishListContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>

        <App />
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>,
)
