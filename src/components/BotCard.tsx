import { Pause, Play, TrendingUp } from 'lucide-react';
import { DCABot } from '../types';
import { formatCurrency, getNextBuyCountdown } from '../utils/formatters';

interface BotCardProps {
  bot: DCABot;
  onToggle: (botId: string) => void;
}

export default function BotCard({ bot, onToggle }: BotCardProps) {
  const countdown = getNextBuyCountdown(bot.nextBuyAt);

  return (
    <div className="bg-[#1A1F26] rounded-3xl p-6 hover:bg-[#1F252E] transition-all border border-gray-800 hover:border-[#00D4A1]/30">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{bot.coinPair}</h3>
          <p className="text-sm text-gray-400 capitalize">{bot.frequency}</p>
        </div>
        <button
          onClick={() => onToggle(bot.id)}
          className={`p-3 rounded-xl transition-all ${
            bot.isActive
              ? 'bg-[#00D4A1]/10 text-[#00D4A1] hover:bg-[#00D4A1]/20'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {bot.isActive ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-white mb-1">
          {formatCurrency(bot.amountPerBuy)}
        </p>
        <p className="text-sm text-gray-400">per buy</p>
      </div>

      <div className="flex items-center gap-2 bg-[#0E1116] rounded-xl px-4 py-3 mb-4">
        <TrendingUp size={16} className="text-[#00D4A1]" />
        <span className="text-sm text-gray-300">
          Next buy in <span className="text-white font-semibold">{countdown}</span>
        </span>
      </div>

      <div className="h-16 bg-[#0E1116] rounded-xl flex items-center justify-center">
        <div className="text-xs text-gray-500">Average cost chart</div>
      </div>
    </div>
  );
}
