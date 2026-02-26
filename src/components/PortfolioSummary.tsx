import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../stores/usePortfolioStore";
import { useStockStore } from "../stores/useStockStore";


// interface PortfolioState {
//     holdings: Stock[],
//     totalValue: number,
//     gainLoss: number,
//     isLoading: boolean,
//     error: string | null
// }
// interface PortfolioSummaryProps {
//     availableStocks: Stock[]
// }
// this function would contain props from PortFolioSummaryProps 
// and is passing availableStocks as an props
export const PortfolioSummary: React.FC= () => {
    // const [portfolio, setPortfolio] = useState<PortfolioState>({
    //     holdings: [],
    //     totalValue: 0,
    //     gainLoss: 0,
    //     isLoading: true,
    //     error: null,
    // })
      const availableStocks = useStockStore(state => state.allStocks);

    const holdings = usePortfolioStore(s => s.holdings);
    const gainLoss = usePortfolioStore(s => s.gainLoss); 
    const totalValue = usePortfolioStore(s => s.totalValue);
    const isLoading = usePortfolioStore(s => s.isLoading);
    const error = usePortfolioStore(s => s.error); 
    const loadPortfolio = usePortfolioStore(s => s.loadPortfolio);

    const [selectedSector, setSelectedSector] = useState<string>('')
    // const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('price')

    useEffect(() => {
        loadPortfolio(availableStocks);
    }, [availableStocks,loadPortfolio])

    const filteredStocks = selectedSector === ''
        ? holdings
        : holdings.filter(s => s.sector === selectedSector)

    //     const sortedAndFiltered = [...filteredStocks].sort((a, b) => {
    //     if (sortBy === 'price') return b.price - a.price;
    //     if (sortBy === 'change') return b.change - a.change;
    //     // Add volume if it exists on your Stock type
    //     return 0;
    // });

    if (isLoading) return <p>Loading portfolio...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <div style={{ border: '1px solid #D1D5DB', borderRadius: 8, padding: 16 }}>
            <p>Total Value: ${totalValue.toLocaleString()}</p>
            <p style={{ color: gainLoss >= 0 ? 'green' : 'red' }}>
                Gain/Loss: ${gainLoss.toFixed(2)}
            </p>

            <select value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}>
                <option value=''>All</option>
                <option value='Technology'>Technology</option>
                <option value='Finance'>Finance</option>
                <option value='Automotive'>Automotive</option>
            </select>

            <ul>
                {filteredStocks.map((s) => (
                    <li key={s.id}>{s.symbol}: ${s.price.toFixed(2)} </li>
                ))}
            </ul>
        </div>
    )
}