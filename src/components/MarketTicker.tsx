import React from 'react';
import type { MarketIndex } from '../types/stock.types';

interface MarketTickerProps {
  indices: MarketIndex[];
}

const MarketTicker: React.FC<MarketTickerProps> = ({ indices }) => {
  // We double the data to create a seamless infinite loop
  const tickerItems = [...indices, ...indices];

  return (
    <div 
      style={{
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E5E7EB',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Inject Keyframes */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div 
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'scroll 30s linear infinite',
          paddingLeft: '20px'
        }}
      >
        {tickerItems.map((item, index) => {
          const isPositive = item.change >= 0;
          const color = isPositive ? '#10B981' : '#EF4444';
          const arrow = isPositive ? '▲' : '▼';

          return (
            <div 
              key={`${item.id}-${index}`} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 24px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                borderRight: '1px solid #F3F4F6'
              }}
            >
              <span style={{ color: '#6B7280', fontWeight: 600 }}>{item.symbol}</span>
              <span>{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              <span style={{ 
                color, 
                fontSize: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '2px' 
              }}>
                {arrow} {Math.abs(item.changePct).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketTicker;
