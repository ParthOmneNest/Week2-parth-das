import type { Holdings, Positions, Stock, Trade } from '../types/stock.types';

export const positions: Positions[] = [
    // --- Technology ---
    {
        id: 'p1',
        symbol: 'AAPL',
        Qty: 10,
        Avg_Price: 185.50,
        ltp: 264.58,
        pnl: 790.80  // (264.58 - 185.50) * 10
    },
    {
        id: 'p2',
        symbol: 'NVDA',
        Qty: 25,
        Avg_Price: 145.00,
        ltp: 189.82,
        pnl: 1120.50 // (189.82 - 145.00) * 25
    },
    {
        id: 'p3',
        symbol: 'MSFT',
        Qty: 8,
        Avg_Price: 385.10,
        ltp: 397.23,
        pnl: 97.04   // (397.23 - 385.10) * 8
    },
    {
        id: 'p4',
        symbol: 'META',
        Qty: 12,
        Avg_Price: 690.00,
        ltp: 655.66,
        pnl: 787.92  // (695.66 - 590.00) * 12
    },
    // --- Finance ---
    {
        id: 'p5',
        symbol: 'JPM',
        Qty: 20,
        Avg_Price: 194.00,
        ltp: 310.79,
        pnl: 2335.80 // (310.79 - 194.00) * 20
    },
    {
        id: 'p6',
        symbol: 'V',
        Qty: 15,
        Avg_Price: 380.50,
        ltp: 320.95,
        pnl: 606.75  // (320.95 - 380.50) * 15
    },
    {
        id: 'p7',
        symbol: 'GS',
        Qty: 5,
        Avg_Price: 395.00,
        ltp: 412.10,
        pnl: 85.50   // (412.10 - 395.00) * 5
    },
    // --- Automotive ---
    {
        id: 'p8',
        symbol: 'TSLA',
        Qty: 5,
        Avg_Price: 260.00,
        ltp: 411.82,
        pnl: 759.10  // (411.82 - 260.00) * 5
    },
    {
        id: 'p9',
        symbol: 'TM',
        Qty: 30,
        Avg_Price: 295.20,
        ltp: 215.60,
        pnl: 612.00  // (215.60 - 295.20) * 30
    },
    {
        id: 'p10',
        symbol: 'F',
        Qty: 100,
        Avg_Price: 10.50,
        ltp: 12.15,
        pnl: 165.00  // (12.15 - 10.50) * 100
    }
];




export const stocks: Stock[] = [
    // --- Technology ---
    {
        id: '1', symbol: 'AAPL', name: 'Apple Inc.',
        price: 264.58, change: 2.15, changePct: 1.54,
        volume: 42_070_000, marketCap: 3_880_000_000_000, sector: 'Technology'
    },
    {
        id: '2', symbol: 'NVDA', name: 'NVIDIA Corp.',
        price: 189.82, change: 1.92, changePct: 1.02,
        volume: 178_420_000, marketCap: 4_610_000_000_000, sector: 'Technology'
    },
    {
        id: '3', symbol: 'MSFT', name: 'Microsoft Corp.',
        price: 397.23, change: 4.20, changePct: -0.31,
        volume: 34_010_000, marketCap: 2_950_000_000_000, sector: 'Technology'
    },
    {
        id: '4', symbol: 'GOOGL', name: 'Alphabet Inc.',
        price: 314.98, change: -0.95, changePct: 4.01,
        volume: 33_660_000, marketCap: 3_810_000_000_000, sector: 'Technology'
    },
    {
        id: '5', symbol: 'META', name: 'Meta Platforms Inc.',
        price: 655.66, change: 10.85, changePct: 1.69,
        volume: 14_180_000, marketCap: 1_660_000_000_000, sector: 'Technology'
    },
    // --- Finance ---
    {
        id: '6', symbol: 'JPM', name: 'JPMorgan Chase',
        price: 310.79, change: 1.05, changePct: 0.89,
        volume: 7_790_000, marketCap: 838_210_000_000, sector: 'Finance'
    },
    {
        id: '7', symbol: 'V', name: 'Visa Inc.',
        price: 320.95, change: 2.01, changePct: 0.63,
        volume: 6_830_000, marketCap: 611_730_000_000, sector: 'Finance'
    },
    {
        id: '8', symbol: 'MA', name: 'Mastercard Inc.',
        price: 524.40, change: 3.12, changePct: 0.60,
        volume: 2_150_000, marketCap: 478_500_000_000, sector: 'Finance'
    },
    {
        id: '9', symbol: 'BAC', name: 'Bank of America',
        price: 48.25, change: -0.15, changePct: -0.31,
        volume: 32_400_000, marketCap: 375_200_000_000, sector: 'Finance'
    },
    {
        id: '10', symbol: 'GS', name: 'Goldman Sachs',
        price: 412.10, change: 5.45, changePct: 1.34,
        volume: 1_850_000, marketCap: 135_600_000_000, sector: 'Finance'
    },
    // --- Automotive ---
    {
        id: '11', symbol: 'TSLA', name: 'Tesla Inc.',
        price: 411.82, change: -7.30, changePct: 0.03,
        volume: 57_910_000, marketCap: 1_550_000_000_000, sector: 'Automotive'
    },
    {
        id: '12', symbol: 'F', name: 'Ford Motor Co.',
        price: 12.15, change: 0.08, changePct: 0.66,
        volume: 45_200_000, marketCap: 48_500_000_000, sector: 'Automotive'
    },
    {
        id: '13', symbol: 'GM', name: 'General Motors',
        price: 45.30, change: -0.42, changePct: -0.92,
        volume: 12_800_000, marketCap: 51_200_000_000, sector: 'Automotive'
    },
    {
        id: '14', symbol: 'TM', name: 'Toyota Motor Corp.',
        price: 215.60, change: 1.25, changePct: 0.58,
        volume: 1_200_000, marketCap: 285_400_000_000, sector: 'Automotive'
    },
    {
        id: '15', symbol: 'STLA', name: 'Stellantis N.V.',
        price: 24.18, change: -0.12, changePct: -0.49,
        volume: 4_300_000, marketCap: 74_200_000_000, sector: 'Automotive'
    }
];


export const trades: Trade[] = [
    { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 10, price: 175.00, date: '2024-01-15' },
    { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 5, price: 360.00, date: '2024-02-20' },
    { id: 't3', stockId: '11', symbol: 'TSLA', type: 'SELL', quantity: 8, price: 265.00, date: '2024-03-10' },
    
    // --- Technology Accumulation ---
    { id: 't4', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 5, price: 180.20, date: '2024-04-05' },
    { id: 't5', stockId: '2', symbol: 'NVDA', type: 'BUY', quantity: 10, price: 130.50, date: '2024-04-12' },
    { id: 't6', stockId: '2', symbol: 'NVDA', type: 'BUY', quantity: 15, price: 154.60, date: '2024-05-18' },
    { id: 't7', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 3, price: 426.90, date: '2024-06-01' },
    { id: 't8', stockId: '5', symbol: 'META', type: 'BUY', quantity: 12, price: 690.00, date: '2024-06-15' },
    { id: 't9', stockId: '4', symbol: 'GOOGL', type: 'BUY', quantity: 20, price: 295.00, date: '2024-07-02' },
    { id: 't10', stockId: '4', symbol: 'GOOGL', type: 'SELL', quantity: 20, price: 310.50, date: '2024-08-10' },

    // --- Finance Sector Entry ---
    { id: 't11', stockId: '6', symbol: 'JPM', type: 'BUY', quantity: 10, price: 185.00, date: '2024-01-20' },
    { id: 't12', stockId: '6', symbol: 'JPM', type: 'BUY', quantity: 10, price: 203.00, date: '2024-02-15' },
    { id: 't13', stockId: '7', symbol: 'V', type: 'BUY', quantity: 15, price: 380.50, date: '2024-03-05' },
    { id: 't14', stockId: '10', symbol: 'GS', type: 'BUY', quantity: 5, price: 395.00, date: '2024-03-22' },
    { id: 't15', stockId: '8', symbol: 'MA', type: 'BUY', quantity: 4, price: 510.00, date: '2024-04-10' },
    { id: 't16', stockId: '9', symbol: 'BAC', type: 'BUY', quantity: 50, price: 42.00, date: '2024-05-05' },
    { id: 't17', stockId: '9', symbol: 'BAC', type: 'SELL', quantity: 50, price: 47.50, date: '2024-06-12' },

    // --- Automotive Sector ---
    { id: 't18', stockId: '11', symbol: 'TSLA', type: 'BUY', quantity: 5, price: 260.00, date: '2024-01-10' },
    { id: 't19', stockId: '14', symbol: 'TM', type: 'BUY', quantity: 30, price: 295.20, date: '2024-02-28' },
    { id: 't20', stockId: '12', symbol: 'F', type: 'BUY', quantity: 100, price: 10.50, date: '2024-03-15' },
    { id: 't21', stockId: '13', symbol: 'GM', type: 'BUY', quantity: 25, price: 40.00, date: '2024-04-20' },
    { id: 't22', stockId: '15', symbol: 'STLA', type: 'BUY', quantity: 40, price: 22.00, date: '2024-05-10' },
    { id: 't23', stockId: '13', symbol: 'GM', type: 'SELL', quantity: 25, price: 46.20, date: '2024-07-15' },

    // --- High Frequency / Trading Simulation ---
    { id: 't24', stockId: '1', symbol: 'AAPL', type: 'SELL', quantity: 5, price: 210.00, date: '2024-08-01' },
    { id: 't25', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 5, price: 205.00, date: '2024-08-15' },
    { id: 't26', stockId: '2', symbol: 'NVDA', type: 'SELL', quantity: 5, price: 195.00, date: '2024-09-01' },
    { id: 't27', stockId: '2', symbol: 'NVDA', type: 'BUY', quantity: 5, price: 180.00, date: '2024-09-10' },
    { id: 't28', stockId: '12', symbol: 'F', type: 'BUY', quantity: 50, price: 11.20, date: '2024-09-20' },
    { id: 't29', stockId: '12', symbol: 'F', type: 'SELL', quantity: 50, price: 12.80, date: '2024-10-05' },
    { id: 't30', stockId: '6', symbol: 'JPM', type: 'BUY', quantity: 5, price: 215.00, date: '2024-10-15' },
    { id: 't31', stockId: '6', symbol: 'JPM', type: 'SELL', quantity: 5, price: 240.00, date: '2024-11-01' },
    { id: 't32', stockId: '5', symbol: 'META', type: 'BUY', quantity: 3, price: 580.00, date: '2024-11-10' },
    { id: 't33', stockId: '5', symbol: 'META', type: 'SELL', quantity: 3, price: 620.00, date: '2024-11-25' },
    { id: 't34', stockId: '8', symbol: 'MA', type: 'BUY', quantity: 2, price: 505.00, date: '2024-12-01' },
    { id: 't35', stockId: '8', symbol: 'MA', type: 'SELL', quantity: 6, price: 535.00, date: '2024-12-15' },
    { id: 't36', stockId: '15', symbol: 'STLA', type: 'SELL', quantity: 40, price: 25.50, date: '2024-12-20' },
    
    // --- 2025 Strategic Moves ---
    { id: 't37', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 5, price: 245.00, date: '2025-01-05' },
    { id: 't38', stockId: '2', symbol: 'NVDA', type: 'BUY', quantity: 10, price: 165.00, date: '2025-01-12' },
    { id: 't39', stockId: '11', symbol: 'TSLA', type: 'BUY', quantity: 10, price: 380.00, date: '2025-01-20' },
    { id: 't40', stockId: '11', symbol: 'TSLA', type: 'SELL', quantity: 10, price: 420.00, date: '2025-02-02' },
    { id: 't41', stockId: '3', symbol: 'MSFT', type: 'BUY', quantity: 2, price: 390.00, date: '2025-02-10' },
    { id: 't42', stockId: '7', symbol: 'V', type: 'BUY', quantity: 10, price: 310.00, date: '2025-02-14' },
    { id: 't43', stockId: '7', symbol: 'V', type: 'SELL', quantity: 10, price: 330.00, date: '2025-02-18' },
    { id: 't44', stockId: '10', symbol: 'GS', type: 'BUY', quantity: 2, price: 405.00, date: '2025-02-20' },
    { id: 't45', stockId: '10', symbol: 'GS', type: 'SELL', quantity: 2, price: 415.00, date: '2025-02-22' },
    { id: 't46', stockId: '4', symbol: 'GOOGL', type: 'BUY', quantity: 10, price: 305.00, date: '2025-02-24' },
    { id: 't47', stockId: '14', symbol: 'TM', type: 'SELL', quantity: 10, price: 230.00, date: '2025-02-25' },
    { id: 't48', stockId: '14', symbol: 'TM', type: 'BUY', quantity: 10, price: 210.00, date: '2025-02-26' },
    { id: 't49', stockId: '2', symbol: 'NVDA', type: 'BUY', quantity: 5, price: 185.00, date: '2025-02-27' },
    { id: 't50', stockId: '1', symbol: 'AAPL', type: 'BUY', quantity: 2, price: 260.00, date: '2025-02-28' },
    { id: 't51', stockId: '12', symbol: 'F', type: 'BUY', quantity: 20, price: 11.50, date: '2025-03-01' },
    { id: 't52', stockId: '12', symbol: 'F', type: 'SELL', quantity: 20, price: 12.50, date: '2025-03-02' },
    { id: 't53', stockId: '6', symbol: 'JPM', type: 'BUY', quantity: 2, price: 305.00, date: '2025-03-03' }
];


export const holdings: Holdings[] = [
    {
        id: 'h1',
        symbol: 'AAPL',
        qty: 10,
        investedValue: 1855.00,
        currentValue: 2645.80,
        totalReturn: 790.80
    },
    {
        id: 'h2',
        symbol: 'NVDA',
        qty: 25,
        investedValue: 3625.00,
        currentValue: 4745.50,
        totalReturn: 1120.50
    },
    {
        id: 'h3',
        symbol: 'MSFT',
        qty: 8,
        investedValue: 3080.80,
        currentValue: 3177.84,
        totalReturn: 97.04
    },
    {
        id: 'h4',
        symbol: 'JPM',
        qty: 20,
        investedValue: 3880.00,
        currentValue: 6215.80,
        totalReturn: 2335.80
    },
    {
        id: 'h5',
        symbol: 'TSLA',
        qty: 5,
        investedValue: 1300.00,
        currentValue: 2059.10,
        totalReturn: 759.10
    }
];

