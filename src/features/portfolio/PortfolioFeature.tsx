import React from 'react';
import { PortfolioSummary } from '../../components/PortfolioSummary';
import type { Stock } from '../../types/stock.types';
 
interface PortfolioFeatureProps {
  availableStocks: Stock[];  // passed straight through to PortfolioSummary
}
 
const PortfolioFeature: React.FC<PortfolioFeatureProps> = ({ availableStocks }) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Portfolio Summary</h2>
      <PortfolioSummary availableStocks={availableStocks} />
    </>
  );
};
 
export default PortfolioFeature;  // REQUIRED for React.lazy()
