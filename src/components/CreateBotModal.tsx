import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface CreateBotModalProps {
  onClose: () => void;
  onCreate: (bot: BotFormData) => void;
}

export interface BotFormData {
  coinPair: string;
  amountPerBuy: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  takeProfitPercent?: number;
  stopLossPercent?: number;
  martingaleEnabled: boolean;
}

const COINS = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', icon: '₿' },
  { symbol: 'ETH/USDT', name: 'Ethereum', icon: 'Ξ' },
  { symbol: 'SOL/USDT', name: 'Solana', icon: '◎' },
  { symbol: 'BNB/USDT', name: 'BNB', icon: '⬡' },
  { symbol: 'ADA/USDT', name: 'Cardano', icon: '₳' },
  { symbol: 'DOT/USDT', name: 'Polkadot', icon: '●' },
];

export default function CreateBotModal({ onClose, onCreate }: CreateBotModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BotFormData>({
    coinPair: '',
    amountPerBuy: 100,
    frequency: 'weekly',
    martingaleEnabled: false,
  });

  const handleCreate = () => {
    onCreate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A1F26] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A1F26] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Create New Bot</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#0E1116] rounded-xl transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-center mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    i === step
                      ? 'bg-[#00D4A1] text-[#0E1116]'
                      : i < step
                      ? 'bg-[#00D4A1]/30 text-[#00D4A1]'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-12 h-0.5 ${
                      i < step ? 'bg-[#00D4A1]/30' : 'bg-gray-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Choose Coin</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {COINS.map(coin => (
                  <button
                    key={coin.symbol}
                    onClick={() => setFormData({ ...formData, coinPair: coin.symbol })}
                    className={`p-6 rounded-2xl border-2 transition-all text-center ${
                      formData.coinPair === coin.symbol
                        ? 'border-[#00D4A1] bg-[#00D4A1]/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-2">{coin.icon}</div>
                    <div className="font-semibold text-white">{coin.name}</div>
                    <div className="text-sm text-gray-400">{coin.symbol}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">How much per buy?</h3>
              <div className="bg-[#0E1116] rounded-2xl p-8 mb-6">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-white mb-2">
                    ${formData.amountPerBuy}
                  </div>
                  <div className="text-gray-400">per buy</div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="5000"
                  step="10"
                  value={formData.amountPerBuy}
                  onChange={e =>
                    setFormData({ ...formData, amountPerBuy: Number(e.target.value) })
                  }
                  className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #00D4A1 0%, #00D4A1 ${
                      ((formData.amountPerBuy - 10) / 4990) * 100
                    }%, #1F252E ${((formData.amountPerBuy - 10) / 4990) * 100}%, #1F252E 100%)`,
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>$10</span>
                  <span>$5,000</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[50, 100, 250, 500].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setFormData({ ...formData, amountPerBuy: amount })}
                    className="py-3 rounded-xl border border-gray-800 hover:border-[#00D4A1] transition-colors text-white font-semibold"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6">How often?</h3>
              <div className="grid gap-4">
                {[
                  { value: 'daily', label: 'Daily', desc: 'Buy every day' },
                  { value: 'weekly', label: 'Weekly', desc: 'Buy every week' },
                  { value: 'monthly', label: 'Monthly', desc: 'Buy every month' },
                ].map(freq => (
                  <button
                    key={freq.value}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        frequency: freq.value as 'daily' | 'weekly' | 'monthly',
                      })
                    }
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      formData.frequency === freq.value
                        ? 'border-[#00D4A1] bg-[#00D4A1]/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-bold text-xl text-white mb-1">{freq.label}</div>
                    <div className="text-gray-400">{freq.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Advanced Settings</h3>
              <p className="text-gray-400 mb-6 text-sm">Optional - can be left empty</p>

              <div className="space-y-6">
                <div>
                  <label className="text-white font-semibold mb-2 block">
                    Take Profit %
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.takeProfitPercent || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        takeProfitPercent: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-[#0E1116] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4A1]"
                  />
                </div>

                <div>
                  <label className="text-white font-semibold mb-2 block">
                    Stop Loss %
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.stopLossPercent || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        stopLossPercent: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full bg-[#0E1116] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00D4A1]"
                  />
                </div>

                <div className="flex items-center justify-between bg-[#0E1116] rounded-xl px-6 py-4">
                  <div>
                    <div className="text-white font-semibold">Martingale</div>
                    <div className="text-sm text-gray-400">Double down on dips</div>
                  </div>
                  <button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        martingaleEnabled: !formData.martingaleEnabled,
                      })
                    }
                    className={`w-14 h-8 rounded-full transition-all ${
                      formData.martingaleEnabled ? 'bg-[#00D4A1]' : 'bg-gray-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        formData.martingaleEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-4 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors text-white font-semibold flex items-center justify-center gap-2"
              >
                <ChevronLeft size={20} />
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.coinPair}
                className="flex-1 py-4 rounded-xl bg-[#00D4A1] hover:bg-[#00E5B0] transition-colors text-[#0E1116] font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="flex-1 py-4 rounded-xl bg-[#00D4A1] hover:bg-[#00E5B0] transition-colors text-[#0E1116] font-semibold"
              >
                Activate Bot – Starts in 5 minutes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
