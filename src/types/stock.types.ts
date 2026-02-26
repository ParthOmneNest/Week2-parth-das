export interface Stock{
    id:string,
    symbol:string,
    name:string,
    price:number,
    change:number,
    changePct:number,
    volume:number,
    marketCap:number,
    sector:string
}
export interface Trade{
    id:string,
    stockId:string,
    symbol:string,
    type:'BUY'|'SELL',
    quantity:number,
    price:number,
    date:string
}
export interface Portfolio{
    totalValue:number,
    totalCost:number,
    gainLoss:number,
    holdings:Stock[]
}

export interface Position{
    id:string
    symbol:string,
    Qty:number,
    Avg_Price:number,
    ltp:number,
    pnl?:number,
    pnlPct?:number,
}

export interface Holding{
    id:string,
    symbol:string,
    qty:number,
    investedValue:number,
    currentValue:number,
    totalReturn:number,
    
}

export interface MarketIndex {
  id: string;
  symbol: string;
  price: number;
  change: number;
  changePct: number;
}