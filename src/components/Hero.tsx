import { TrendingUp, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen bg-[#0E1116] text-white flex flex-col">
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-[#00D4A1]" size={28} />
          <span className="text-xl font-bold">HODL Bot</span>
        </div>
        <button
          onClick={onGetStarted}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sign In
        </button>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Turn $50 into Bitcoin<br />
            <span className="text-[#00D4A1]">every week</span> – automatically
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            No timing the market. No emotions. Just steady growth.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-[#00D4A1] text-[#0E1116] px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-[#00E5B0] transition-all transform hover:scale-105 shadow-2xl shadow-[#00D4A1]/20"
          >
            Start Free in 60 Seconds
          </button>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[#00D4A1]" />
              <span>160,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#00D4A1]" />
              <span>100% non-custodial</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#00D4A1]" />
              <span>Powered by BingX/Pionex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
