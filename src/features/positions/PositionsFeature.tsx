import React from 'react';
import { useShallow } from 'zustand/shallow';
import { DataTable } from '../../components/DataTable';
import { usePositionStore } from '../../stores/usePositionStore';
import type { Position } from '../../types/stock.types';

// interface PositionsFeatureProps {
//   positions: Position[];
// }

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {

  var numberValue = Number(value);

  var isPositive = numberValue >= 0;
  var textColour = isPositive ? '#166534' : '#991B1B';

  var prefix = isPositive ? '+' : '';

  var currencySign = suffix === '%' ? '' : '$';

  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const PositionsFeature: React.FC = () => {
  const { toggleCompare, isInCompare } = usePositionStore(
    useShallow((state) => ({
      toggleCompare: state.toggleCompare,
      isInCompare: state.isInCompare,
      _listVersion: state.compareList.length


    }))
  );

  const positions = usePositionStore(s => s.allPositions);
  const removePosition = usePositionStore(s => s.removePosition);



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
          { key: 'symbol', header: 'Symbol', sortable: true },
          { key: 'Qty', header: 'Qty', sortable: true },
          {
            key: 'Avg_Price', header: 'Avg Price', sortable: true,
            render: function (value) { return '$' + Number(value).toFixed(2); }
          },
          {
            key: 'ltp', header: 'LTP', sortable: true,
            render: function (value) { return '$' + Number(value).toFixed(2); }
          },
          {
            key: 'pnl', header: 'P&L', sortable: true,
            render: function (value) { return pnlCell(value); }
          },
          {
            key: 'pnlPct',
            header: 'P&L %',
            sortable: true,
            render: function (_value, row) {
              // Use optional chaining and fallbacks to handle undefined
              const pnl = row.pnl ?? 0;
              const qty = row.Qty ?? 0;
              const avgPrice = row.Avg_Price ?? 0;

              // Prevent division by zero if qty or avgPrice are 0
              const denominator = qty * avgPrice;
              const calculatedPct = denominator !== 0 ? (pnl / denominator) * 100 : 0;

              return pnlCell(calculatedPct, '%');
            }
          },
          {
            key: 'id',
            header: 'Compare',
            render: (_value, row) => {
              const active = isInCompare(row.id);
              return (
                <button
                  onClick={() => toggleCompare(row)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    border: '1px solid #10B981',
                    transition: 'all 0.2s',
                    backgroundColor: active ? '#10B981' : 'transparent',
                    color: active ? '#fff' : '#10B981',
                  }}
                >
                  {active ? '✓ Selected' : '+ Add'}
                </button>
              );
            }
          }, {
            key: 'id', header: 'Action',
            render: (_v, row) => (
              <button onClick={() => removePosition(row.id)}>
                Remove
              </button>
            )
          }

        ]}
      />
    </>
  );
};

export default PositionsFeature;
