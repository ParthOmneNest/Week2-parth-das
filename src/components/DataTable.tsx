import { useMemo, useState } from "react";

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
    pageSize?: number; 
}


export const DataTable = <T extends object>({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found',
    filterKey,
    searchQuery
 
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

    if (sortedData.length === 0) return <p>{emptyMessage}</p>
    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ background: '#1E3A8A', color: '#fff' }}>
                    {columns.map((col) => (
                        <th
                            key={String(col.key)}
                            // Only allow click if 'sortable' prop is true
                            onClick={() => col.sortable && handleSort(col.key)}
                            style={{
                                padding: 8,
                                textAlign: 'left',
                                cursor: col.sortable ? 'pointer' : 'default',
                                userSelect: 'none'
                            }}
                        >
                            {col.header}
                            {/* Visual Indicator */}
                            {col.sortable && (
                                <span style={{ marginLeft: 8 }}>
                                    {sortConfig?.key === col.key
                                        ? (sortConfig.direction === 'asc' ? '▲' : '▼')
                                        : '↕'}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {sortedData.map((row, ri) => (
                    <tr
                        key={String(row[rowKey])}
                        onClick={() => onRowClick?.(row)}
                        style={{
                            background: ri % 2 == 0 ? '#fff' : '#F8FAFC',
                            cursor: onRowClick ? 'pointer' : 'default'
                        }}
                    >
                        {columns.map((col) => (
                            <td key={String(col.key)} style={{ padding: 8 }}>
                                {col.render
                                    ? col.render(row[col.key], row)
                                    : String(row[col.key])
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}