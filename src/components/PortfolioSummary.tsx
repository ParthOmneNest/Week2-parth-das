import React, { useEffect, useState } from "react";
import type { Stock } from "../types/stock.types";

interface PortfolioState {
    holdings: Stock[],
    totalValue: number,
    gainLoss: number,
    isLoading: boolean,
    error: string | null
}
interface PortfolioSummaryProps {
    availableStocks: Stock[]
}
// this function would contain props from PortFolioSummaryProps 
// and is passing availableStocks as an props
export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ availableStocks }) => {
    const [portfolio, setPortfolio] = useState<PortfolioState>({
        holdings: [],
        totalValue: 0,
        gainLoss: 0,
        isLoading: true,
        error: null,
    })

    const [selectedSector, setSelectedSector] = useState<string>('')
    // const [sortBy, setSortBy] = useState<'price' | 'change' | 'volume'>('price')

    useEffect(() => {
        setTimeout(() => {
            // Pick top 3 from each major sector: indices 0-2, 20-22, 40-42
            const diverseHoldings = [
                ...availableStocks.slice(0, 3),
                ...availableStocks.slice(20, 23),
                ...availableStocks.slice(40, 43)
            ].filter(Boolean)
            
            const totalValue = diverseHoldings.reduce((sum, s) => sum + s.price * 10, 0)
            const totalCost = diverseHoldings.reduce((sum, s) => sum + (s.price - s.change) * 10, 0)

            setPortfolio({
                holdings: diverseHoldings,
                totalValue,
                gainLoss: totalValue - totalCost,
                isLoading: false,
                error: null,
            })
        }, 800)
    }, [availableStocks])
    const filteredStocks = selectedSector === ''
        ? portfolio.holdings
        : portfolio.holdings.filter(s => s.sector === selectedSector)

//     const sortedAndFiltered = [...filteredStocks].sort((a, b) => {
//     if (sortBy === 'price') return b.price - a.price;
//     if (sortBy === 'change') return b.change - a.change;
//     // Add volume if it exists on your Stock type
//     return 0;
// });

        if(portfolio.isLoading) return<p>Loading portfolio...</p>
        if(portfolio.error) return<p>Error: {portfolio.error}</p>
    return (
        <div style={{border:'1px solid #D1D5DB',borderRadius:8,padding:16}}>
            <h2>Portfolio Summary</h2>
            <p>Total Value: ${portfolio.totalValue.toLocaleString()}</p>
            <p style={{color:portfolio.gainLoss>=0?'green':'red'}}>
                Gain/Loss: ${portfolio.gainLoss.toFixed(2)}
            </p>

            <select value={selectedSector}
            onChange={(e)=>setSelectedSector(e.target.value)}>
                <option value=''>All</option>
                <option value='Technology'>Technology</option>
                <option value='Finance'>Finance</option>
                <option value='Automotive'>Automotive</option>
            </select>

            <ul>
                {filteredStocks.map((s)=>(
                    <li key={s.id}>{s.symbol}: ${s.price.toFixed(2)} </li>
                ))}
            </ul>
        </div>
    )
}