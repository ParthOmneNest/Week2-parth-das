import { useState } from 'react'
import './App.css'
import { DataTable } from './components/DataTable'
import { PortfolioSummary } from './components/PortfolioSummary'
import { SearchBar } from './components/SearchBar'
import { StockCard } from './components/StockCard'
import { TradeForm } from './components/TradeForm'

// Data
import { positions, stocks, trades } from './data/stockData';

// Types
import type { Positions, Stock, Trade } from './types/stock.types';


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
  // Add a new trade (receives NewTradeInput — no id/date)
  const handleNewTrade = (input: Omit<Trade, 'id' | 'date'>) => {
    const newTrade: Trade = {
      ...input,
      id: `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(prev => [newTrade, ...prev]);
  };

  return (
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
    // Inside App.tsx return statement

{/* Generic Components — Stock table */}
<DataTable<Stock>
  data={filteredStocks}
  rowKey='id'
  onRowClick={setSelectedStock}
  columns={[
    { key: 'symbol', header: 'Symbol', sortable: true }, // Added sortable
    { key: 'name', header: 'Company', sortable: true },   // Added sortable
    {
      key: 'price', header: 'Price', sortable: true,      // Added sortable
      render: v => `$${Number(v).toFixed(2)}`
    },
    {
      key: 'changePct', header: 'Change %', sortable: true, // Added sortable
      render: v => {
        const n = Number(v);
        return <span style={{ color: n >= 0 ? 'green' : 'red' }}>
          {n >= 0 ? '+' : ''}{n.toFixed(2)}%
        </span>;
      }
    },
    { key: 'volume', header: 'Volume' },
  ]}
/>

{/* Positions Table */}
<DataTable<Positions>
  data={positionsData} 
  rowKey='id'
  columns={[
    { key: 'symbol', header: 'Symbol', sortable: true },
    { key: 'Qty', header: 'Qty', sortable: true },
    { key: 'Avg_Price', header: 'Avg. Price' ,sortable: true},
    { key: 'ltp', header: 'LTP' ,sortable: true},
    {
      key: 'pnl', header: 'P&L', sortable: true, // Added sortable to track biggest gainers/losers
      render: v => (
        <span style={{ color: Number(v) >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
          {Number(v) >= 0 ? '+' : ''}{Number(v).toFixed(2)}
        </span>
      )
    }
  ]}
/>


      {/* Generic Components — Trade table */}
      <h2 style={{ color: '#1E40AF' }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey='id'
        columns={[
          { key: 'symbol', header: 'Symbol' },
          {
            key: 'type', header: 'Type',
            render: v => <strong style={{ color: v === 'BUY' ? 'green' : 'red' }}>
              {String(v)}</strong>
          },
          { key: 'quantity', header: 'Qty' },
          {
            key: 'price', header: 'Price',
            render: v => `$${Number(v).toFixed(2)}`
          },
          { key: 'date', header: 'Date' },
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
