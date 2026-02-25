import React from 'react';
import { DataTable } from '../../components/DataTable';
import type { Position } from '../../types/stock.types';
 
interface PositionsFeatureProps {
  positions: Position[];
}
 
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
 
  var numberValue  = Number(value);
 
  var isPositive   = numberValue >= 0;
  var textColour   = isPositive ? '#166534' : '#991B1B';
 
  var prefix = isPositive ? '+' : '';
 
  var currencySign = suffix === '%' ? '' : '$';
 
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}
 
const PositionsFeature: React.FC<PositionsFeatureProps> = ({ positions }) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Positions</h2>
      <DataTable<Position>
        data={positions}
        rowKey="id"
        filterKey="symbol"
        enableInfiniteScroll={true}
        pageSize={10}
        columns={[
          { key: 'symbol',   header: 'Symbol',    sortable: true },
          { key: 'Qty',      header: 'Qty',       sortable: true },
          { key: 'Avg_Price', header: 'Avg Price', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'ltp',      header: 'LTP',       sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'pnl',    header: 'P&L',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
          { key: 'pnlPct', header: 'P&L %', sortable: true,
            render: function(_value, row) { 
              const calculatedPct = (row.pnl / (row.Qty * row.Avg_Price)) * 100;
              return pnlCell(calculatedPct, '%'); 
            }
          },
        ]}
      />
    </>
  );
};
 
export default PositionsFeature;
