import { lazy, useState } from 'react';
import './App.css';
// Components (if needed but currently unused in main App logic as lazy loaded)
// import { TradeForm } from './components/TradeForm'

// Data
import { SuspenseBoundary } from './boundaries/SuspenseBoundary';
import MarketTicker from './components/MarketTicker';
import { holdings, marketIndices, positions, stocks, trades } from './data/stockData';

//skeleton
import { CardGridSkeleton } from './skeletons/CardGridSkeleton';
import { FormSkeleton } from './skeletons/FormSkeleton';
import { TableSkeleton } from './skeletons/TableSkeleton';

// Types
import type { Stock, Trade } from './types/stock.types';

// MODULE 2: Lazy (dynamic) import
const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});
const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
});
 

 
const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});
 
const TradeFeature = lazy(function() {
  return import('./features/trades/TradeFeature');
});
 
type NewTradeInput = Omit<Trade, 'id' | 'date'>;

function App() {
  const [selectedStock,  setSelectedStock]  = useState<Stock | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sectorFilter,   setSectorFilter]   = useState('');
  const [tradeHistory,   setTradeHistory]   = useState<Trade[]>(trades);
 
  // ── Filtered stocks (UNCHANGED) ─────────────────────────────────────
  var filteredStocks = stocks.filter(function(stock) {
    var queryLower     = searchQuery.toLowerCase();
    var symbolMatches  = stock.symbol.toLowerCase().includes(queryLower);
    var nameMatches    = stock.name.toLowerCase().includes(queryLower);
    var searchMatches  = symbolMatches || nameMatches;
    var noFilter       = sectorFilter === '';
    var sectorMatches  = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });
 
  // ── handleNewTrade (UNCHANGED) ───────────────────────────────────────
  function handleNewTrade(input: NewTradeInput): void {
    var newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }
  return(
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 24px 24px', fontFamily: 'Arial, sans-serif' }}>
      <MarketTicker indices={marketIndices} />
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>
 
      {/* ── FEATURE 1: Live Quotes — uses BOTH skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>
 
      {/* ── FEATURE 2: Portfolio Summary ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>
 

 
      {/* ── FEATURE 4: Holdings ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={holdings} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 5: Trade History + Form — uses TWO skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          tradeHistory={tradeHistory}
          stocks={stocks}
          selectedStock={selectedStock}
          onSubmitTrade={handleNewTrade}
          positions={positions}
        />
      </SuspenseBoundary>
 
    </div>
  );
}

export default App
