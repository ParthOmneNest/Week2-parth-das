import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
                Prev
            </button>
            
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        padding: '6px 12px',
                        cursor: 'pointer',
                        backgroundColor: currentPage === page ? '#1E40AF' : '#fff',
                        color: currentPage === page ? '#fff' : '#000',
                        border: '1px solid #1E40AF',
                        borderRadius: '4px'
                    }}
                >
                    {page}
                </button>
            ))}

            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
                Next
            </button>
        </div>
    );
};
