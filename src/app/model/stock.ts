export interface Stock {
    sName: string;
    openPrice: number;
    currentPrice: number;
    changePercent: number;
}

export interface protfolio {
    sName: string;
    buyPrice: number;
    currentPrice: number;
    quantity: number;
    totalBuyPrice: number;
    holdingValue: number;
    profit: number;
}


export interface history {
    action: string;
    sName: string;
    buyPrice: number;
    totalBuyPrice: number;
    quantity: number;
    log: string;
    ppi: number;
}