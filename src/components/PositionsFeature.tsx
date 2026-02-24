import type { Trade, Stock, Positions } from '../types/stock.types';
import { DataTable } from './DataTable';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

interface PositionsFeatureProps {
    positions: Positions[];
    stocks?: Stock[];
    selectedStock?: Stock | null;
}


export const PositionsFeature: React.FC<PositionsFeatureProps> = ({
    positions,
}) => {

    // NEW: get the slice of items + ref + flag from the hook
    const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positions, 15);


    return (
        <>
            <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
                {visibleItems.length} of {positions.length} shown
            </span>

            {/* data={visibleItems} is the only change inside DataTable */}
            <DataTable<Positions>
                data={visibleItems}
                rowKey="id"
                columns={[
                    { key: 'symbol', header: 'Symbol', sortable: true },
                    { key: 'Qty', header: 'Qty', sortable: true },
                    {
                        key: 'Avg_Price',
                        header: 'Avg. Price',
                        render: v => `$${Number(v).toFixed(2)}`
                    },
                    {
                        key: 'ltp',
                        header: 'LTP',
                        render: v => `$${Number(v).toFixed(2)}`
                    },
                    {
                        key: 'pnl',
                        header: 'P&L',
                        sortable: true,
                        render: v => {
                            const val = Number(v);
                            return (
                                <span style={{ color: val >= 0 ? '#166534' : '#991B1B', fontWeight: 'bold' }}>
                        {val >= 0 ? '+' : ''}{val.toFixed(2)}
                                </span>
                            );
                        }
                    }
                ]}
            />


            {/* NEW: the sentinel div — observer watches this */}
            <div ref={bottomRef} style={{ height: "40px" }} />

            {/* NEW: status messages */}
            {hasMore && (
                <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
                    Loading more positions...
                </p>
            )}
            {hasMore === false && positions.length > 0 && (
                <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
                    All {positions.length} positions loaded
                </p>
            )}


            {/* Trade form is unchanged */}
            {/* <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
            <TradeForm
                stocks={stocks}
                onSubmitTrade={onSubmitTrade}
                initialValues={selectedStock ?? {}}
            /> */}


        </>
    );
};
