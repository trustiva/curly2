import { X, Check } from 'lucide-react';

interface PricingModalProps {
  onClose: () => void;
}

export default function PricingModal({ onClose }: PricingModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A1F26] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1A1F26] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#0E1116] rounded-xl transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#0E1116] rounded-3xl p-8 border-2 border-gray-800">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">1 active bot</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Daily, Weekly, Monthly intervals</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic portfolio tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">CSV export</span>
                </li>
              </ul>

              <button className="w-full py-4 rounded-xl border-2 border-gray-800 hover:border-gray-700 transition-colors text-white font-semibold">
                Current Plan
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#00D4A1]/20 to-[#00D4A1]/5 rounded-3xl p-8 border-2 border-[#00D4A1] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00D4A1] text-[#0E1116] px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$9</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Unlimited active bots</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Custom intervals (every 4h, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Advanced features (Take Profit, Stop Loss, Martingale)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Tax report generator</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Portfolio rebalancing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-[#00D4A1] mt-0.5 flex-shrink-0" />
                  <span className="text-white font-semibold">Priority support</span>
                </li>
              </ul>

              <button className="w-full py-4 rounded-xl bg-[#00D4A1] hover:bg-[#00E5B0] transition-colors text-[#0E1116] font-semibold">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
