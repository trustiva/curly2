export interface DCABot {
  id: string;
  userId: string;
  coinPair: string;
  amountPerBuy: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  isActive: boolean;
  nextBuyAt: string;
  createdAt: string;
  takeProfitPercent?: number;
  stopLossPercent?: number;
  martingaleEnabled: boolean;
}

export interface Transaction {
  id: string;
  botId: string;
  coinPair: string;
  price: number;
  amount: number;
  total: number;
  executedAt: string;
}

export interface PortfolioStats {
  totalInvested: number;
  averageBuyPrice: number;
  currentValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}
