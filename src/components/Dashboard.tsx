import { Plus, History, CreditCard } from 'lucide-react';
import { DCABot, PortfolioStats } from '../types';
import BotCard from './BotCard';
import { formatCurrency } from '../utils/formatters';

interface DashboardProps {
  stats: PortfolioStats;
  bots: DCABot[];
  onCreateBot: () => void;
  onToggleBot: (botId: string) => void;
  onViewHistory: () => void;
  onViewPricing: () => void;
}

export default function Dashboard({
  stats,
  bots,
  onCreateBot,
  onToggleBot,
  onViewHistory,
  onViewPricing
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-[#0E1116] text-white">
      <nav className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HODL Bot</h1>
        <div className="flex gap-3">
          <button
            onClick={onViewHistory}
            className="p-2 hover:bg-[#1A1F26] rounded-xl transition-colors"
          >
            <History size={22} />
          </button>
          <button
            onClick={onViewPricing}
            className="p-2 hover:bg-[#1A1F26] rounded-xl transition-colors"
          >
            <CreditCard size={22} />
          </button>
        </div>
      </nav>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#1A1F26] rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-2">Total Invested</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalInvested)}</p>
          </div>

          <div className="bg-[#1A1F26] rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-2">Avg Buy Price</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.averageBuyPrice)}</p>
          </div>

          <div className="bg-[#1A1F26] rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-2">Current Value</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.currentValue)}</p>
          </div>

          <div className="bg-[#1A1F26] rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-2">Unrealized P&L</p>
            <p className={`text-2xl font-bold ${stats.unrealizedPnL >= 0 ? 'text-[#00D4A1]' : 'text-red-500'}`}>
              {stats.unrealizedPnL >= 0 ? '+' : ''}{formatCurrency(stats.unrealizedPnL)}
            </p>
            <p className={`text-xs ${stats.unrealizedPnLPercent >= 0 ? 'text-[#00D4A1]' : 'text-red-500'}`}>
              {stats.unrealizedPnLPercent >= 0 ? '+' : ''}{stats.unrealizedPnLPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Active DCA Bots</h2>
          <button
            onClick={onCreateBot}
            className="bg-[#00D4A1] text-[#0E1116] px-6 py-3 rounded-xl font-semibold hover:bg-[#00E5B0] transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            New Bot
          </button>
        </div>

        {bots.length === 0 ? (
          <div className="bg-[#1A1F26] rounded-3xl p-12 text-center">
            <p className="text-gray-400 mb-6">No active bots yet. Create your first one!</p>
            <button
              onClick={onCreateBot}
              className="bg-[#00D4A1] text-[#0E1116] px-8 py-4 rounded-xl font-semibold hover:bg-[#00E5B0] transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} />
              Quick Start New Bot
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map(bot => (
              <BotCard key={bot.id} bot={bot} onToggle={onToggleBot} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
