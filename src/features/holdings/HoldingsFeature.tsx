import React, { useMemo } from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { DataTable } from '../../components/DataTable';
import type { Holding } from '../../types/stock.types';

interface HoldingsFeatureProps {
  holdings: Holding[];
}

// Premium Color Palette for the Pie Chart
const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
];

function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  const numberValue = Number(value);
  const isPositive = numberValue >= 0;
  const textColour = isPositive ? '#166534' : '#991B1B';
  const prefix = isPositive ? '+' : '';
  const currencySign = suffix === '%' ? '' : '$';
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}

const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
  // Prepare data for the Pie Chart
  const chartData = useMemo(() => {
    return holdings.map(h => ({
      name: h.symbol,
      value: h.currentValue
    })).sort((a, b) => b.value - a.value);
  }, [holdings]);

  // Custom Tooltip for the Pie Chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #E5E7EB', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: '#1E3A8A' }}>{payload[0].name}</p>
          <p style={{ margin: 0, color: '#374151' }}>
            Value: ${payload[0].value.toLocaleString()}
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>
            {((payload[0].value / chartData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ color: '#1E40AF', marginBottom: 20 }}>Portfolio Allocation & Holdings</h2>
      
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
        alignItems: 'flex-start'
      }}>
        
        {/* Table Section (Left/Top) */}
        <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
          <DataTable<Holding>
            data={holdings}
            rowKey="id"
            filterKey="symbol"
            pageSize={10}
            enableInfiniteScroll={true}
            columns={[
              { key: 'symbol',        header: 'Symbol',         sortable: true },
              { key: 'qty',           header: 'Qty',            sortable: true },
              { key: 'investedValue', header: 'Invested Value', sortable: true,
                render: (value) => '$' + Number(value).toLocaleString()
              },
              { key: 'currentValue',  header: 'Current Value',  sortable: true,
                render: (value) => '$' + Number(value).toLocaleString()
              },
              { key: 'totalReturn',   header: 'Total Return',   sortable: true,
                render: (value) => pnlCell(value)
              },
            ]}
          />
        </div>

        {/* Chart Section (Right/Bottom) */}
        <div style={{ 
          width: window.innerWidth < 1024 ? '100%' : '400px', 
          height: '400px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#374151' }}>Allocation by Symbol</h3>
          <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value: string) => <span style={{ color: '#4B5563', fontSize: '12px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HoldingsFeature;
