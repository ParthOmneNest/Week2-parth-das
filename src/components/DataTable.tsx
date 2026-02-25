import { useMemo, useState } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useVirtualList } from "../hooks/useVirtualList";

// column definition is generic
interface Column<T> {
    key: keyof T,
    header: string,
    render?: (value: T[keyof T], row: T) => React.ReactNode,
    width?: number
    sortable?: boolean
}

interface DataTableProps<T extends object> {
    data: T[],
    columns: Column<T>[],
    rowKey: keyof T,
    onRowClick?: (row: T) => void,
    emptyMessage?: string,
    filterKey?: keyof T,
    searchQuery?:string,
    pageSize?: number,
    enableInfiniteScroll?: boolean,
    enableVirtualization?: boolean,
    rowHeight?: number,
    containerHeight?: number,
    isLoading?: boolean
}


export const DataTable = <T extends object>({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found',
    filterKey,
    searchQuery,
    pageSize = 10,
    enableInfiniteScroll = false,
    enableVirtualization = false,
    rowHeight = 44,
    containerHeight = 400,
    isLoading = false

}: DataTableProps<T>) => {
    // 1. State: Tracks which column is active and the direction (asc/desc)
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

    // 2. Handler: Toggles between ASC -> DESC -> ASC when clicking the same header
    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
       // 3.1. First, Filter the data
    const filteredData = useMemo(() => {
        if (!filterKey || !searchQuery) return data;
        
        return data.filter((item) => 
            String(item[filterKey])
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [data, filterKey, searchQuery]);
    // 3.2. Sorting Logic: Memoized to prevent re-sorting on every render
    const sortedData = useMemo(() => {
        // If no sort is selected, return the original data
        if (!sortConfig) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            // Handle null/undefined values
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            if (aVal < bVal) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aVal > bVal) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredData, sortConfig]);

    // infinite-scroll Logic
    const { visibleItems: scrollVisible, bottomRef, hasMore } = useInfiniteScroll(sortedData, pageSize);
    
    // Virtualization Logic
    const { 
        visibleItems: virtualVisible, 
        containerRef, 
        spaceAbove, 
        spaceBelow, 
        startIndex 
    } = useVirtualList(sortedData, { 
        rowHeight, 
        visibleRows: Math.ceil(containerHeight / rowHeight),
        overscan: 3 
    });

    let displayData = sortedData;
    if (enableInfiniteScroll) displayData = scrollVisible;
    if (enableVirtualization) displayData = virtualVisible;

    // Calculate stats
    const totalCount = sortedData.length;
    const currentShown = displayData.length;
    const statsText = enableVirtualization 
        ? `Showing ${currentShown} rows in view of ${totalCount} total`
        : `Loaded ${currentShown} of ${totalCount} items`;

    if (sortedData.length === 0 && !isLoading) return <p>{emptyMessage}</p>

    return (
        <div style={{ width: '100%', marginBottom: 20 }}>
            <div 
                ref={enableVirtualization ? containerRef : undefined}
                style={{ 
                    width: '100%', 
                    height: enableVirtualization ? containerHeight : 'auto', 
                    overflowY: enableVirtualization ? 'auto' : 'visible',
                    border: '1px solid #E5E7EB',
                    borderRadius: 8
                }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={enableVirtualization ? { position: 'sticky', top: 0, zIndex: 1 } : undefined}>
                        <tr style={{ background: '#1E3A8A', color: '#fff' }}>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    // Only allow click if 'sortable' prop is true
                                    onClick={() => col.sortable && handleSort(col.key)}
                                    style={{
                                        padding: 12,
                                        textAlign: 'left',
                                        cursor: col.sortable ? 'pointer' : 'default',
                                        userSelect: 'none',
                                        fontSize: 14
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {col.header}
                                        {col.sortable && (
                                            <span style={{ fontSize: 12, opacity: 0.8 }}>
                                                {sortConfig?.key === col.key
                                                    ? (sortConfig.direction === 'asc' ? '▲' : '▼')
                                                    : '↕'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {enableVirtualization && spaceAbove > 0 && (
                            <tr><td colSpan={columns.length} style={{ height: spaceAbove, padding: 0 }} /></tr>
                        )}
                        
                        {isLoading && sortedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} style={{ padding: 24, textAlign: 'center', color: '#6B7280' }}>
                                    Loading data...
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row, ri) => {
                                const actualIndex = enableVirtualization ? startIndex + ri : ri;
                                return (
                                    <tr
                                        key={String(row[rowKey])}
                                        onClick={() => onRowClick?.(row)}
                                        style={{
                                            background: actualIndex % 2 == 0 ? '#fff' : '#F8FAFC',
                                            cursor: onRowClick ? 'pointer' : 'default',
                                            height: enableVirtualization ? rowHeight : 'auto',
                                            borderBottom: '1px solid #F1F5F9'
                                        }}
                                    >
                                        {columns.map((col) => (
                                            <td key={String(col.key)} style={{ padding: 12, fontSize: 14 }}>
                                                {col.render
                                                    ? col.render(row[col.key], row)
                                                    : String(row[col.key])
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        )}
                        
                        {enableVirtualization && spaceBelow > 0 && (
                            <tr><td colSpan={columns.length} style={{ height: spaceBelow, padding: 0 }} /></tr>
                        )}
                    </tbody>
                </table>

                {enableInfiniteScroll && !enableVirtualization && (
                    <div ref={bottomRef} style={{ padding: 16, textAlign: 'center' }}>
                        {isLoading || (hasMore && <span style={{ color: '#6B7280', fontSize: 13 }}>Loading more items...</span>)}
                        {!hasMore && totalCount > 0 && <span style={{ color: '#9CA3AF', fontSize: 13 }}>You've reached the end.</span>}
                    </div>
                )}
            </div>
            
            {/* Stats Footer */}
            <div style={{ marginTop: 8, fontSize: 12, color: '#6B7280', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                <span>{statsText}</span>
                {enableInfiniteScroll && hasMore && <span style={{ fontStyle: 'italic' }}>Scroll down to load more</span>}
            </div>
        </div>
    )
}