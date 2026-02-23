import React, { useState, useMemo } from 'react';
// column definition is generic
interface Column<T> {
    key: keyof T,
    header: string,
    render?: (value: T[keyof T], row: T) => React.ReactNode,
    width?: number
    sortable?:boolean
}

interface DataTableProps<T extends object> {
    data: T[],
    columns: Column<T>[],
    rowKey: keyof T,
    onRowClick?: (row: T) => void,
    emptyMessage?: string,
}

// ... interfaces from above ...

export const DataTable = <T extends object>({
    data, columns, rowKey, onRowClick, emptyMessage = 'No data found'
}: DataTableProps<T>) => {
    // 1. State to track current sort
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);

    // 2. Logic to handle header click
    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 3. Memoized sorted data
    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    if (data.length === 0) return <p>{emptyMessage}</p>;

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ background: '#1E3A8A', color: '#fff' }}>
                    {columns.map((col) => (
                        <th 
                            key={String(col.key)} 
                            onClick={() => col.sortable && handleSort(col.key)} // Click trigger
                            style={{ 
                                padding: 8, 
                                textAlign: 'left', 
                                cursor: col.sortable ? 'pointer' : 'default',
                                userSelect: 'none'
                            }}
                        >
                            {col.header}
                            {/* 4. Sorting Indicator */}
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
                            background: ri % 2 === 0 ? '#fff' : '#F8FAFC',
                            cursor: onRowClick ? 'pointer' : 'default'
                        }}
                    >
                        {columns.map((col) => (
                            <td key={String(col.key)} style={{ padding: 8 }}>
                                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
