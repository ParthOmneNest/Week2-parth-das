import React from 'react';
import { DataTable } from "../../components/DataTable";
import { SearchBar } from "../../components/SearchBar";
import { StockCard } from "../../components/StockCard";
import type { Stock } from "../../types/stock.types";

const ROW_HEIGHT       = 44;
const VISIBLE_ROWS     = 12;
const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;
 
interface LiveQuotesFeatureProps {
  stocks:         Stock[];
  selectedStock:  Stock | null;
  onSelectStock:  (stock: Stock) => void;
  onSearch:       (query: string) => void;
  onFilterChange: (sector: string) => void;
}
 
const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
  stocks, selectedStock, onSelectStock, onSearch, onFilterChange,
}) => {
  return (
    <>
      <SearchBar onSearch={onSearch} onFilterChange={onFilterChange}
        placeholder="Search by symbol or name..." />
 
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {stocks.slice(0, 6).map(function(stock) {
          return (
            <StockCard key={stock.id} stock={stock}
              isSelected={selectedStock?.id === stock.id}
              onSelect={onSelectStock} />
          );
        })}
      </div>
 
      <h2 style={{ color:'#1E40AF' }}>Live Quotes</h2>

      <DataTable<Stock>
        data={stocks}
        rowKey="id"
        filterKey="symbol"
        enableVirtualization={true}
        rowHeight={ROW_HEIGHT}
        containerHeight={CONTAINER_HEIGHT}
        onRowClick={onSelectStock}
        columns={[
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'name',   header: 'Company', sortable: true },
          { key: 'price',  header: 'Price',   sortable: true,
            render: (val) => `$${Number(val).toFixed(2)}`
          },
          { key: 'changePct', header: 'Change %', sortable: true,
            render: (val) => {
              const num = Number(val);
              const color = num >= 0 ? '#166534' : '#991B1B';
              return <span style={{ color, fontWeight: 'bold' }}>{num >= 0 ? '+' : ''}{num.toFixed(2)}%</span>;
            }
          },
          { key: 'volume', header: 'Volume', sortable: true,
            render: (val) => Number(val).toLocaleString()
          },
          { key: 'sector', header: 'Sector', sortable: true }
        ]}
      />
 
      <p style={{ fontSize:13, color:'#9CA3AF', marginTop:6 }}>
        {stocks.length} total stocks available
      </p>
    </>
  );
};
 
export default LiveQuotesFeature;
