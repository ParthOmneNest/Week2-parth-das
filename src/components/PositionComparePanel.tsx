import React from 'react';
import { useShallow } from 'zustand/shallow';
import { usePositionStore } from '../stores/usePositionStore';
import type { Position } from '../types/stock.types';

const panelStyles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#fff', borderTop: '2px solid #10B981', // Different color (Emerald) for positions
    padding: '16px 24px', zIndex: 1001, // Slightly higher z-index if overlapping
    boxShadow: '0 -4px 12px rgba(0,0,0,0.12)',
    maxHeight: '40vh', overflowY: 'auto',
  },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 },
  clearBtn: { background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  thLabel: { padding: '8px 12px', textAlign: 'left', width: 130, position: 'sticky', top: 0, backgroundColor: '#065F46' },
  thContent: { padding: '8px 12px', textAlign: 'center', minWidth: 110, position: 'sticky', top: 0, backgroundColor: '#065F46' },
  tdLabel: { padding: '7px 12px', fontWeight: 'bold', borderRight: '1px solid #E5E7EB' },
  tdContent: { padding: '7px 12px', textAlign: 'center', borderRight: '1px solid #F3F4F6', transition: 'background-color 0.2s' },
  removeBtn: { marginLeft: 8, background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer', fontSize: 10 },
};

const POSITION_ROWS: {
  label: string;
  key: keyof Position;
  format?: (v: any) => string;
}[] = [
    {
      label: 'Qty',
      key: 'Qty',
      format: (v) => Number(v).toLocaleString(),
    },
    {
      label: 'Avg Price',
      key: 'Avg_Price',
      format: (v) => '$' + Number(v).toFixed(2),
    },
    {
      label: 'LTP',
      key: 'ltp',
      format: (v) => '$' + Number(v).toFixed(2),
    },
    {
      label: 'P&L',
      key: 'pnl',
      format: (v) => (Number(v) >= 0 ? '+' : '') + '$' + Number(v).toLocaleString(),
    },
    {
      label: 'P&L %',
      key: 'pnl' as any, // We calculate this row
      format: (v) => (v ? (Number(v) >= 0 ? '+' : '') + Number(v).toFixed(2) + '%' : '0.00%'),
    },
  ];

export const PositionComparePanel: React.FC = () => {
  const { compareList, clearCompare, toggleCompare } = usePositionStore(
    useShallow((state) => ({
      compareList: state.compareList,
      clearCompare: state.clearCompare,
      toggleCompare: state.toggleCompare,
    }))
  );

  if (compareList.length < 2) return null;

  return (
    <div style={panelStyles.container}>
      {/* Header */}
      <div style={panelStyles.header}>
        <h3 style={{ margin: 0, color: '#065F46', fontSize: 16 }}>
          Comparing {compareList.length} Positions
        </h3>
        <button onClick={clearCompare} style={panelStyles.clearBtn}>
          Clear All
        </button>
      </div>

      {/* Comparison Table */}
      <table style={panelStyles.table}>
        <thead>
          <tr style={{ backgroundColor: '#065F46', color: '#fff' }}>
            <th style={panelStyles.thLabel}>Metric</th>
            {compareList.map((pos) => (
              <th key={pos.id} style={panelStyles.thContent}>
                <div>{pos.symbol}</div>
                <button
                  onClick={() => toggleCompare(pos)}
                  style={panelStyles.removeBtn}
                >✕</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {POSITION_ROWS.map((row, rowIndex) => {
            // Optimization: Calculate max/min for the row once
            const values = compareList.map(pos => {
              if (row.label === 'P&L %') {
                const pnl = pos.pnl ?? 0; // Fallback to 0 if undefined
                const invested = (pos.Qty ?? 0) * (pos.Avg_Price ?? 0);
                return invested === 0 ? 0 : (pnl / invested) * 100;
              }
              return Number(pos[row.key]) || 0;
            });
            const maxVal = Math.max(...values);
            const minVal = Math.min(...values);

            return (
              <tr key={row.label} style={{ backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                <td style={panelStyles.tdLabel}>{row.label}</td>
                {compareList.map((pos) => {
                  let rawValue = pos[row.key];

                  if (row.label === 'P&L %') {
                    const pnl = pos.pnl ?? 0;
                    const invested = (pos.Qty ?? 0) * (pos.Avg_Price ?? 0);
                    rawValue = invested === 0 ? 0 : (pnl / invested) * 100;
                  }

                  const numValue = Number(rawValue) || 0;
                  const isPnlRow = row.key === 'pnl' || row.label === 'P&L %';

                  // Highlight Green for Max
                  const isBest = numValue === maxVal && maxVal !== minVal;
                  const isWorst = isPnlRow && numValue === minVal && numValue < 0;

                  return (
                    <td
                      key={pos.id}
                      style={{
                        ...panelStyles.tdContent,
                        color: isBest ? '#166534' : isWorst ? '#991B1B' : '#111827',
                        backgroundColor: isBest ? '#D1FAE5' : isWorst ? '#FEE2E2' : 'transparent',
                        fontWeight: isBest || isWorst ? 'bold' : 'normal',
                      }}
                    >
                      {isBest && '▲ '}
                      {isWorst && '▼ '}
                      {row.format ? row.format(rawValue) : String(rawValue)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};