import { useMemo } from 'react'
 
import React, { lazy, useState } from 'react';
import './App.css'
import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import { PortfolioSummary } from './components/PortfolioSummary'
import { SearchBar } from './components/SearchBar'
import { StockCard } from './components/StockCard'
// import { TradeForm } from './components/TradeForm'

// Data
import { holdings, positions, stocks, trades } from './data/stockData'
import { SuspenseBoundary } from './boundaries/SuspenseBoundary';

//skeleton
import { TableSkeleton } from './skeletons/TableSkeleton';
import { CardGridSkeleton } from './skeletons/CardGridSkeleton';
import { FormSkeleton } from './skeletons/FormSkeleton';

// Types
import type { Holding, Position, Stock, Trade } from './types/stock.types'

// MODULE 2: Lazy (dynamic) import
const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});
const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
});
 
const PositionsFeature = lazy(function() {
  return import('./features/positions/PositionsFeature');
});
 
const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});
 
const TradeFeature = lazy(function() {
  return import('./features/trades/TradeFeature');
});
 
type NewTradeInput = Omit<Trade, 'id' | 'date'>;

function App() {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [tradeHistory, setTradeHistory] = useState<Trade[]>(trades);

  // Filter stocks based on search and sector
  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      || s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !sectorFilter || s.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  // map the matching stocks for Positions sections
  const positionsData = positions.map((pos) => {
    const currentStock = stocks.find(s => s.symbol === pos.symbol)
    const currentPrice = currentStock ? currentStock.price : pos.ltp

    return {
      ...pos,
      ltp: currentPrice,
      pnl: (currentPrice - pos.Avg_Price) * pos.Qty
    }
  })

  const holdingsData = holdings.map((pos) => {
    const currentStock = stocks.find(s => s.symbol === pos.symbol)
    const currentPrice = currentStock ? currentStock.price : pos.currentValue

    return {
      ...pos,
      currentValue: currentPrice,
      pnl: (currentPrice - pos.investedValue) * pos.qty
    }
  })
  const [holdingsSearch, setHoldingsSearch] = useState('');
  const filteredHoldings = holdingsData.filter(h => 
  h.symbol.toLowerCase().includes(holdingsSearch.toLowerCase())
);
  // Add a new trade (receives NewTradeInput — no id/date)
  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }
  return(
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A' }}>Stock Market Dashboard</h1>

      {/* Event Typing */}
      <SearchBar
        onSearch={setSearchQuery}
        onFilterChange={setSectorFilter}
        placeholder='Search by symbol or name...'
      />

      {/* Typing Props */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {filteredStocks.map(stock => (
          <StockCard
            key={stock.id}
            stock={stock}
            isSelected={selectedStock?.id === stock.id}
            onSelect={setSelectedStock}
          />
        ))}
      </div>

      {/* Typing State */}
      <PortfolioSummary availableStocks={stocks} />

      {/* Generic Components — Stock table */}
      <h2 style={{ color: '#1E40AF' }}>Live Quotes</h2>
      <DataTable<Stock>
        data={filteredStocks}
        rowKey='id'
        onRowClick={setSelectedStock}
        emptyMessage='No stocks match your search.'
        columns={[
          { key: 'symbol', header: 'Symbol' },
          { key: 'name', header: 'Company' },
          {
            key: 'price', header: 'Price',
            render: v => `$${Number(v).toFixed(2)}`
          },
          {
            key: 'changePct', header: 'Change %',
            render: v => {
              const n = Number(v);
              return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
                {n >= 0 ? '+' : ''}{n.toFixed(2)}%
              </span>;
            }
          },
          {
            key: 'volume', header: 'Volume',
            render: v => Number(v).toLocaleString()
          },
        ]}
      />

      {/* Positions Table */}
      <h2 style={{ color: '#1E40AF' }}>Live Positions</h2>


      <DataTable<Positions>
        data={positionsData}
        rowKey='id'
        onRowClick={(pos) => console.log('Position selected:', pos.symbol)}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'Qty', header: 'Qty', sortable: true },
          { key: 'Avg_Price', header: 'Avg. Price', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          { key: 'ltp', header: 'LTP', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          {
            key: 'pnl',
            header: 'P&L',
            sortable: true,
            render: v => (
              <span style={{ color: Number(v) >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                {Number(v) >= 0 ? '+' : ''}{Number(v).toFixed(2)}
              </span>
            )
          }
        ]}
      />
      {/* Search sections for holdings table */}
      <SearchBar
        onSearch={setHoldingsSearch}
        placeholder='Search by symbol...'
      />
      {/* 3. Holdings Table */}
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      <DataTable<Holdings>
        data={filteredHoldings}
        rowKey='id'
        onRowClick={(pos) => console.log('Holdings selected:', pos.symbol)}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'qty', header: 'Qty', sortable: true },
          { key: 'investedValue', header: 'Invested Value', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          { key: 'currentValue', header: 'Current Value', sortable: true, render: v => `$${Number(v).toFixed(2)}` },
          {
            key: 'totalReturn',
            header: 'Total Return',
            sortable: true,
            render: v => (
              <span style={{ color: Number(v) >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                {Number(v) >= 0 ? '+' : ''}{Number(v).toFixed(2)}
              </span>
            )
          }
        ]}
      />
      {/* 4. Trade History Table - Added sortable to Date and Symbol */}
      <h2 style={{ color: '#1E40AF' }}>Trade Table</h2>

      <DataTable<Trade>
        data={tradeHistory}
        rowKey='id'
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          {
            key: 'type', header: 'Type',
            render: v => <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>{String(v)}</strong>
          },
          { key: 'quantity', header: 'Qty', sortable: true },
          {
            key: 'price', header: 'Price', sortable: true,
            render: v => `$${Number(v).toFixed(2)}`
          },
          { key: 'date', header: 'Date', sortable: true },
        ]}
      />
      {/* Utility Types */}
      <h2 style={{ color: '#1E40AF' }}>New Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={handleNewTrade}
        initialValues={selectedStock ?? {}}
      />
    </div>
  );
}

export default App
