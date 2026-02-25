import React, { lazy, Suspense } from 'react';
import { DataTable } from '../../components/DataTable';
import { TradeForm } from '../../components/TradeForm';
import type { Position, Stock, Trade } from '../../types/stock.types';

const PositionsFeature = lazy(() => import('../positions/PositionsFeature'));
 
// Trade but WITHOUT id and date (the form user hasn't submitted yet)
type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
interface TradeFeatureProps {
  tradeHistory:  Trade[];
  stocks:        Stock[];
  selectedStock: Stock | null;
  onSubmitTrade: (input: NewTradeInput) => void;
  positions:     Position[];
}
 
const TradeFeature: React.FC<TradeFeatureProps> = ({
  tradeHistory,
  stocks,
  selectedStock,
  onSubmitTrade,
  positions
}) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Your Current Positions</h2>
      <Suspense fallback={<p>Loading positions...</p>}>
        <PositionsFeature positions={positions} />
      </Suspense>

      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Trade History</h2>
      <DataTable<Trade>
        data={tradeHistory}
        rowKey="id"
        filterKey="symbol"
        enableInfiniteScroll={true}
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              // BUY = green text, SELL = red text
              var isBuy   = value === 'BUY';
              var colour  = isBuy ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',     sortable: true },
          { key: 'price',    header: 'Price',   sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',    sortable: true },
        ]}
      />
 
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={stocks}
        onSubmitTrade={onSubmitTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};
 
export default TradeFeature;  // REQUIRED for React.lazy()
