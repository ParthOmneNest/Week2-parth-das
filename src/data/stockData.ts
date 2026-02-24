import type { Holding, MarketIndex, Position, Stock, Trade } from '../types/stock.types';

export const positions: Position[] = [
    // --- Existing 1-10 (Technology, Finance, Automotive) ---
    { id: 'p1', symbol: 'AAPL', Qty: 10, Avg_Price: 185.50, ltp: 264.58, pnl: 790.80 },
    { id: 'p2', symbol: 'NVDA', Qty: 25, Avg_Price: 145.00, ltp: 189.82, pnl: 1120.50 },
    { id: 'p3', symbol: 'MSFT', Qty: 8, Avg_Price: 385.10, ltp: 397.23, pnl: 97.04 },
    { id: 'p4', symbol: 'META', Qty: 12, Avg_Price: 690.00, ltp: 655.66, pnl: -412.08 },
    { id: 'p5', symbol: 'JPM', Qty: 20, Avg_Price: 194.00, ltp: 310.79, pnl: 2335.80 },
    { id: 'p6', symbol: 'V', Qty: 15, Avg_Price: 380.50, ltp: 320.95, pnl: -893.25 },
    { id: 'p7', symbol: 'GS', Qty: 5, Avg_Price: 395.00, ltp: 412.10, pnl: 85.50 },
    { id: 'p8', symbol: 'TSLA', Qty: 5, Avg_Price: 260.00, ltp: 411.82, pnl: 759.10 },
    { id: 'p9', symbol: 'TM', Qty: 30, Avg_Price: 295.20, ltp: 215.60, pnl: -2388.00 },
    { id: 'p10', symbol: 'F', Qty: 100, Avg_Price: 10.50, ltp: 12.15, pnl: 165.00 },

    // --- Healthcare (p11 - p20) ---
    { id: 'p11', symbol: 'LLY', Qty: 15, Avg_Price: 750.00, ltp: 920.45, pnl: 2556.75 },
    { id: 'p12', symbol: 'UNH', Qty: 10, Avg_Price: 510.00, ltp: 585.10, pnl: 751.00 },
    { id: 'p13', symbol: 'JNJ', Qty: 40, Avg_Price: 155.00, ltp: 162.30, pnl: 292.00 },
    { id: 'p14', symbol: 'MRK', Qty: 25, Avg_Price: 110.00, ltp: 128.50, pnl: 462.50 },
    { id: 'p15', symbol: 'ABBV', Qty: 30, Avg_Price: 165.00, ltp: 178.90, pnl: 417.00 },
    { id: 'p16', symbol: 'PFE', Qty: 200, Avg_Price: 32.00, ltp: 28.40, pnl: -720.00 },
    { id: 'p17', symbol: 'AMGN', Qty: 12, Avg_Price: 280.00, ltp: 315.60, pnl: 427.20 },
    { id: 'p18', symbol: 'ISRG', Qty: 8, Avg_Price: 420.00, ltp: 495.20, pnl: 601.60 },
    { id: 'p19', symbol: 'TMO', Qty: 5, Avg_Price: 580.00, ltp: 560.80, pnl: -96.00 },
    { id: 'p20', symbol: 'CVS', Qty: 50, Avg_Price: 68.00, ltp: 74.30, pnl: 315.00 },

    // --- Consumer / Retail (p21 - p30) ---
    { id: 'p21', symbol: 'AMZN', Qty: 15, Avg_Price: 175.00, ltp: 215.40, pnl: 606.00 },
    { id: 'p22', symbol: 'WMT', Qty: 45, Avg_Price: 62.00, ltp: 82.15, pnl: 906.75 },
    { id: 'p23', symbol: 'HD', Qty: 10, Avg_Price: 340.00, ltp: 365.40, pnl: 254.00 },
    { id: 'p24', symbol: 'COST', Qty: 5, Avg_Price: 720.00, ltp: 885.30, pnl: 826.50 },
    { id: 'p25', symbol: 'PG', Qty: 20, Avg_Price: 155.00, ltp: 168.20, pnl: 264.00 },
    { id: 'p26', symbol: 'NKE', Qty: 25, Avg_Price: 105.00, ltp: 94.50, pnl: -262.50 },
    { id: 'p27', symbol: 'KO', Qty: 100, Avg_Price: 58.00, ltp: 68.40, pnl: 1040.00 },
    { id: 'p28', symbol: 'PEP', Qty: 30, Avg_Price: 168.00, ltp: 172.15, pnl: 124.50 },
    { id: 'p29', symbol: 'MCD', Qty: 15, Avg_Price: 275.00, ltp: 295.60, pnl: 309.00 },
    { id: 'p30', symbol: 'SBUX', Qty: 40, Avg_Price: 92.00, ltp: 98.40, pnl: 256.00 },

    // --- Energy & Industrials (p31 - p40) ---
    { id: 'p31', symbol: 'XOM', Qty: 60, Avg_Price: 102.00, ltp: 118.50, pnl: 990.00 },
    { id: 'p32', symbol: 'CVX', Qty: 40, Avg_Price: 148.00, ltp: 154.20, pnl: 248.00 },
    { id: 'p33', symbol: 'CAT', Qty: 10, Avg_Price: 295.00, ltp: 345.10, pnl: 501.00 },
    { id: 'p34', symbol: 'GE', Qty: 25, Avg_Price: 140.00, ltp: 185.40, pnl: 1135.00 },
    { id: 'p35', symbol: 'BA', Qty: 15, Avg_Price: 210.00, ltp: 158.20, pnl: -777.00 },
    { id: 'p36', symbol: 'HON', Qty: 20, Avg_Price: 195.00, ltp: 212.50, pnl: 350.00 },
    { id: 'p37', symbol: 'UPS', Qty: 18, Avg_Price: 155.00, ltp: 138.40, pnl: -298.80 },
    { id: 'p38', symbol: 'DE', Qty: 7, Avg_Price: 380.00, ltp: 395.60, pnl: 109.20 },
    { id: 'p39', symbol: 'LMT', Qty: 4, Avg_Price: 450.00, ltp: 545.20, pnl: 380.80 },
    { id: 'p40', symbol: 'RTX', Qty: 35, Avg_Price: 105.00, ltp: 122.30, pnl: 605.50 },

    // --- Technology Growth (p41 - p50) ---
    { id: 'p41', symbol: 'NFLX', Qty: 12, Avg_Price: 580.00, ltp: 685.40, pnl: 1264.80 },
    { id: 'p42', symbol: 'ADBE', Qty: 10, Avg_Price: 540.00, ltp: 512.30, pnl: -277.00 },
    { id: 'p43', symbol: 'CRM', Qty: 20, Avg_Price: 260.00, ltp: 298.50, pnl: 770.00 },
    { id: 'p44', symbol: 'AMD', Qty: 50, Avg_Price: 140.00, ltp: 156.40, pnl: 820.00 },
    { id: 'p45', symbol: 'INTC', Qty: 150, Avg_Price: 35.00, ltp: 22.15, pnl: -1927.50 },
    { id: 'p46', symbol: 'GOOGL', Qty: 10, Avg_Price: 165.00, ltp: 314.98, pnl: 1499.80 },
    { id: 'p47', symbol: 'BAC', Qty: 100, Avg_Price: 34.50, ltp: 48.25, pnl: 1375.00 },
    { id: 'p48', symbol: 'MA', Qty: 6, Avg_Price: 480.00, ltp: 524.40, pnl: 266.40 },
    { id: 'p49', symbol: 'STLA', Qty: 80, Avg_Price: 18.50, ltp: 24.18, pnl: 454.40 },
    { id: 'p50', symbol: 'GM', Qty: 40, Avg_Price: 38.00, ltp: 45.30, pnl: 292.00 },

    // --- High Yield / Misc (p51 - p60) ---
    { id: 'p51', symbol: 'T', Qty: 300, Avg_Price: 16.00, ltp: 19.45, pnl: 1035.00 },
    { id: 'p52', symbol: 'VZ', Qty: 250, Avg_Price: 38.00, ltp: 41.20, pnl: 800.00 },
    { id: 'p53', symbol: 'ORCL', Qty: 40, Avg_Price: 110.00, ltp: 135.50, pnl: 1020.00 },
    { id: 'p54', symbol: 'CSCO', Qty: 60, Avg_Price: 52.00, ltp: 48.90, pnl: -186.00 },
    { id: 'p55', symbol: 'IBM', Qty: 20, Avg_Price: 175.00, ltp: 192.30, pnl: 346.00 },
    { id: 'p56', symbol: 'PYPL', Qty: 50, Avg_Price: 85.00, ltp: 62.40, pnl: -1130.00 },
    { id: 'p57', symbol: 'SQ', Qty: 30, Avg_Price: 72.00, ltp: 78.15, pnl: 184.50 },
    { id: 'p58', symbol: 'SHOP', Qty: 25, Avg_Price: 78.00, ltp: 71.40, pnl: -165.00 },
    { id: 'p59', symbol: 'UBER', Qty: 100, Avg_Price: 45.00, ltp: 72.30, pnl: 2730.00 },
    { id: 'p60', symbol: 'ABNB', Qty: 15, Avg_Price: 145.00, ltp: 156.80, pnl: 177.00 }
];



export const stocks: Stock[] = [
    // --- Technology (Existing 1-5) ---
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 264.58, change: 2.15, changePct: 1.54, volume: 42_070_000, marketCap: 3_880_000_000_000, sector: 'Technology' },
    { id: '2', symbol: 'NVDA', name: 'NVIDIA Corp.', price: 189.82, change: 1.92, changePct: 1.02, volume: 178_420_000, marketCap: 4_610_000_000_000, sector: 'Technology' },
    { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', price: 397.23, change: 4.20, changePct: -0.31, volume: 34_010_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
    { id: '4', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 314.98, change: -0.95, changePct: 4.01, volume: 33_660_000, marketCap: 3_810_000_000_000, sector: 'Technology' },
    { id: '5', symbol: 'META', name: 'Meta Platforms Inc.', price: 655.66, change: 10.85, changePct: 1.69, volume: 14_180_000, marketCap: 1_660_000_000_000, sector: 'Technology' },

    // --- Finance (Existing 6-10) ---
    { id: '6', symbol: 'JPM', name: 'JPMorgan Chase', price: 310.79, change: 1.05, changePct: 0.89, volume: 7_790_000, marketCap: 838_210_000_000, sector: 'Finance' },
    { id: '7', symbol: 'V', name: 'Visa Inc.', price: 320.95, change: 2.01, changePct: 0.63, volume: 6_830_000, marketCap: 611_730_000_000, sector: 'Finance' },
    { id: '8', symbol: 'MA', name: 'Mastercard Inc.', price: 524.40, change: 3.12, changePct: 0.60, volume: 2_150_000, marketCap: 478_500_000_000, sector: 'Finance' },
    { id: '9', symbol: 'BAC', name: 'Bank of America', price: 48.25, change: -0.15, changePct: -0.31, volume: 32_400_000, marketCap: 375_200_000_000, sector: 'Finance' },
    { id: '10', symbol: 'GS', name: 'Goldman Sachs', price: 412.10, change: 5.45, changePct: 1.34, volume: 1_850_000, marketCap: 135_600_000_000, sector: 'Finance' },

    // --- Automotive (Existing 11-15) ---
    { id: '11', symbol: 'TSLA', name: 'Tesla Inc.', price: 411.82, change: -7.30, changePct: 0.03, volume: 57_910_000, marketCap: 1_550_000_000_000, sector: 'Automotive' },
    { id: '12', symbol: 'F', name: 'Ford Motor Co.', price: 12.15, change: 0.08, changePct: 0.66, volume: 45_200_000, marketCap: 48_500_000_000, sector: 'Automotive' },
    { id: '13', symbol: 'GM', name: 'General Motors', price: 45.30, change: -0.42, changePct: -0.92, volume: 12_800_000, marketCap: 51_200_000_000, sector: 'Automotive' },
    { id: '14', symbol: 'TM', name: 'Toyota Motor Corp.', price: 215.60, change: 1.25, changePct: 0.58, volume: 1_200_000, marketCap: 285_400_000_000, sector: 'Automotive' },
    { id: '15', symbol: 'STLA', name: 'Stellantis N.V.', price: 24.18, change: -0.12, changePct: -0.49, volume: 4_300_000, marketCap: 74_200_000_000, sector: 'Automotive' },

    // --- Healthcare (16-25) ---
    { id: '16', symbol: 'LLY', name: 'Eli Lilly & Co.', price: 920.45, change: 12.30, changePct: 1.35, volume: 2_800_000, marketCap: 870_000_000_000, sector: 'Healthcare' },
    { id: '17', symbol: 'UNH', name: 'UnitedHealth Group', price: 585.10, change: -2.40, changePct: -0.41, volume: 3_100_000, marketCap: 540_000_000_000, sector: 'Healthcare' },
    { id: '18', symbol: 'JNJ', name: 'Johnson & Johnson', price: 162.30, change: 0.85, changePct: 0.52, volume: 6_400_000, marketCap: 390_000_000_000, sector: 'Healthcare' },
    { id: '19', symbol: 'MRK', name: 'Merck & Co.', price: 128.50, change: 1.10, changePct: 0.86, volume: 5_900_000, marketCap: 325_000_000_000, sector: 'Healthcare' },
    { id: '20', symbol: 'ABBV', name: 'AbbVie Inc.', price: 178.90, change: -0.45, changePct: -0.25, volume: 4_200_000, marketCap: 315_000_000_000, sector: 'Healthcare' },
    { id: '21', symbol: 'PFE', name: 'Pfizer Inc.', price: 28.40, change: -0.15, changePct: -0.52, volume: 22_000_000, marketCap: 160_000_000_000, sector: 'Healthcare' },
    { id: '22', symbol: 'AMGN', name: 'Amgen Inc.', price: 315.60, change: 4.20, changePct: 1.35, volume: 1_900_000, marketCap: 168_000_000_000, sector: 'Healthcare' },
    { id: '23', symbol: 'ISRG', name: 'Intuitive Surgical', price: 495.20, change: 8.70, changePct: 1.79, volume: 1_400_000, marketCap: 175_000_000_000, sector: 'Healthcare' },
    { id: '24', symbol: 'TMO', name: 'Thermo Fisher Scientific', price: 560.80, change: -3.10, changePct: -0.55, volume: 1_100_000, marketCap: 215_000_000_000, sector: 'Healthcare' },
    { id: '25', symbol: 'CVS', name: 'CVS Health', price: 74.30, change: 0.65, changePct: 0.88, volume: 7_800_000, marketCap: 94_000_000_000, sector: 'Healthcare' },

    // --- E-commerce & Retail (26-35) ---
    { id: '26', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 215.40, change: 3.20, changePct: 1.51, volume: 38_000_000, marketCap: 2_250_000_000_000, sector: 'Consumer' },
    { id: '27', symbol: 'WMT', name: 'Walmart Inc.', price: 82.15, change: 0.45, changePct: 0.55, volume: 15_000_000, marketCap: 660_000_000_000, sector: 'Consumer' },
    { id: '28', symbol: 'HD', name: 'Home Depot Inc.', price: 365.40, change: -1.20, changePct: -0.33, volume: 3_800_000, marketCap: 362_000_000_000, sector: 'Consumer' },
    { id: '29', symbol: 'COST', name: 'Costco Wholesale', price: 885.30, change: 11.20, changePct: 1.28, volume: 1_800_000, marketCap: 392_000_000_000, sector: 'Consumer' },
    { id: '30', symbol: 'PG', name: 'Procter & Gamble', price: 168.20, change: 0.90, changePct: 0.54, volume: 5_200_000, marketCap: 398_000_000_000, sector: 'Consumer' },
    { id: '31', symbol: 'NKE', name: 'Nike Inc.', price: 94.50, change: -2.10, changePct: -2.17, volume: 8_500_000, marketCap: 142_000_000_000, sector: 'Consumer' },
    { id: '32', symbol: 'KO', name: 'Coca-Cola Co.', price: 68.40, change: 0.30, changePct: 0.44, volume: 11_000_000, marketCap: 295_000_000_000, sector: 'Consumer' },
    { id: '33', symbol: 'PEP', name: 'PepsiCo Inc.', price: 172.15, change: -0.85, changePct: -0.49, volume: 4_100_000, marketCap: 236_000_000_000, sector: 'Consumer' },
    { id: '34', symbol: 'MCD', name: "McDonald's Corp.", price: 295.60, change: 1.45, changePct: 0.49, volume: 2_600_000, marketCap: 212_000_000_000, sector: 'Consumer' },
    { id: '35', symbol: 'SBUX', name: 'Starbucks Corp.', price: 98.40, change: 0.75, changePct: 0.77, volume: 6_200_000, marketCap: 110_000_000_000, sector: 'Consumer' },

    // --- Energy & Industrials (36-45) ---
    { id: '36', symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 118.50, change: -0.65, changePct: -0.55, volume: 14_000_000, marketCap: 525_000_000_000, sector: 'Energy' },
    { id: '37', symbol: 'CVX', name: 'Chevron Corp.', price: 154.20, change: -0.90, changePct: -0.58, volume: 7_200_000, marketCap: 285_000_000_000, sector: 'Energy' },
    { id: '38', symbol: 'CAT', name: 'Caterpillar Inc.', price: 345.10, change: 5.30, changePct: 1.56, volume: 2_100_000, marketCap: 170_000_000_000, sector: 'Industrials' },
    { id: '39', symbol: 'GE', name: 'GE Aerospace', price: 185.40, change: 2.15, changePct: 1.17, volume: 4_500_000, marketCap: 202_000_000_000, sector: 'Industrials' },
    { id: '40', symbol: 'BA', name: 'Boeing Co.', price: 158.20, change: -4.50, changePct: -2.77, volume: 9_100_000, marketCap: 96_000_000_000, sector: 'Industrials' },
    { id: '41', symbol: 'HON', name: 'Honeywell Intl.', price: 212.50, change: 1.10, changePct: 0.52, volume: 2_400_000, marketCap: 138_000_000_000, sector: 'Industrials' },
    { id: '42', symbol: 'UPS', name: 'United Parcel Service', price: 138.40, change: -1.25, changePct: -0.90, volume: 3_900_000, marketCap: 118_000_000_000, sector: 'Industrials' },
    { id: '43', symbol: 'DE', name: 'Deere & Co.', price: 395.60, change: 6.80, changePct: 1.75, volume: 1_200_000, marketCap: 112_000_000_000, sector: 'Industrials' },
    { id: '44', symbol: 'LMT', name: 'Lockheed Martin', price: 545.20, change: 3.40, changePct: 0.63, volume: 1_100_000, marketCap: 130_000_000_000, sector: 'Industrials' },
    { id: '45', symbol: 'RTX', name: 'RTX Corporation', price: 122.30, change: 0.85, changePct: 0.70, volume: 4_800_000, marketCap: 162_000_000_000, sector: 'Industrials' },

    // --- Technology/Communication Expansion (46-50) ---
    { id: '46', symbol: 'NFLX', name: 'Netflix Inc.', price: 685.40, change: 9.20, changePct: 1.36, volume: 2_900_000, marketCap: 295_000_000_000, sector: 'Technology' },
    { id: '47', symbol: 'ADBE', name: 'Adobe Inc.', price: 512.30, change: -4.10, changePct: -0.79, volume: 2_400_000, marketCap: 228_000_000_000, sector: 'Technology' },
    { id: '48', symbol: 'CRM', name: 'Salesforce Inc.', price: 298.50, change: 3.20, changePct: 1.08, volume: 4_100_000, marketCap: 288_000_000_000, sector: 'Technology' },
    { id: '49', symbol: 'AMD', name: 'Advanced Micro Devices', price: 156.40, change: 2.10, changePct: 1.36, volume: 45_000_000, marketCap: 252_000_000_000, sector: 'Technology' },
    { id: '50', symbol: 'INTC', name: 'Intel Corp.', price: 22.15, change: -0.45, changePct: -1.99, volume: 35_000_000, marketCap: 94_000_000_000, sector: 'Technology' }
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


export const holdings: Holding[] = [
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
    },
    {
        id: 'h6',
        symbol: 'GOOGL',
        qty: 5,
        investedValue: 1525.00,
        currentValue: 1625.00,
        totalReturn: 100.00
    }
];

export const marketIndices: MarketIndex[] = [
    { id: 'i1', symbol: 'NIFTY 50', price: 22123.45, change: -12.30, changePct: -0.06 },
    { id: 'i2', symbol: 'SENSEX', price: 72890.12, change: 145.67, changePct: 0.20 },
    { id: 'i3', symbol: 'NIFTY BANK', price: 46789.00, change: -89.45, changePct: -0.19 },
    { id: 'i4', symbol: 'NASDAQ', price: 15980.30, change: 210.15, changePct: 1.33 },
    { id: 'i5', symbol: 'S&P 500', price: 5088.80, change: 45.20, changePct: 0.89 },
    { id: 'i6', symbol: 'DOW JONES', price: 39131.50, change: 62.40, changePct: 0.16 },
    { id: 'i7', symbol: 'FINNIFTY', price: 20567.80, change: -23.10, changePct: -0.11 },
    { id: 'i8', symbol: 'NIFTY NEXT 50', price: 58900.25, change: 312.40, changePct: 0.53 },
];

