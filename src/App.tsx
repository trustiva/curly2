import { useState } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CreateBotModal from './components/CreateBotModal';
import HistoryPage from './components/HistoryPage';
import PricingModal from './components/PricingModal';
import { DCABot, Transaction, PortfolioStats } from './types';
import { BotFormData } from './components/CreateBotModal';

type View = 'hero' | 'dashboard' | 'history';

function App() {
  const [view, setView] = useState<View>('hero');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const [bots, setBots] = useState<DCABot[]>([
    {
      id: '1',
      userId: 'demo',
      coinPair: 'BTC/USDT',
      amountPerBuy: 100,
      frequency: 'weekly',
      isActive: true,
      nextBuyAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      martingaleEnabled: false,
    },
    {
      id: '2',
      userId: 'demo',
      coinPair: 'ETH/USDT',
      amountPerBuy: 50,
      frequency: 'daily',
      isActive: true,
      nextBuyAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      martingaleEnabled: false,
    },
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      botId: '1',
      coinPair: 'BTC/USDT',
      price: 42500,
      amount: 0.002353,
      total: 100,
      executedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      botId: '1',
      coinPair: 'BTC/USDT',
      price: 43200,
      amount: 0.002315,
      total: 100,
      executedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      botId: '2',
      coinPair: 'ETH/USDT',
      price: 2250,
      amount: 0.022222,
      total: 50,
      executedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const stats: PortfolioStats = {
    totalInvested: 250,
    averageBuyPrice: 41800,
    currentValue: 265.5,
    unrealizedPnL: 15.5,
    unrealizedPnLPercent: 6.2,
  };

  const handleCreateBot = (formData: BotFormData) => {
    const newBot: DCABot = {
      id: Date.now().toString(),
      userId: 'demo',
      coinPair: formData.coinPair,
      amountPerBuy: formData.amountPerBuy,
      frequency: formData.frequency,
      isActive: true,
      nextBuyAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      takeProfitPercent: formData.takeProfitPercent,
      stopLossPercent: formData.stopLossPercent,
      martingaleEnabled: formData.martingaleEnabled,
    };
    setBots([...bots, newBot]);
  };

  const handleToggleBot = (botId: string) => {
    setBots(bots.map(bot =>
      bot.id === botId ? { ...bot, isActive: !bot.isActive } : bot
    ));
  };

  if (view === 'hero') {
    return <Hero onGetStarted={() => setView('dashboard')} />;
  }

  if (view === 'history') {
    return <HistoryPage transactions={transactions} onBack={() => setView('dashboard')} />;
  }

  return (
    <>
      <Dashboard
        stats={stats}
        bots={bots}
        onCreateBot={() => setShowCreateModal(true)}
        onToggleBot={handleToggleBot}
        onViewHistory={() => setView('history')}
        onViewPricing={() => setShowPricingModal(true)}
      />
      {showCreateModal && (
        <CreateBotModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBot}
        />
      )}
      {showPricingModal && (
        <PricingModal onClose={() => setShowPricingModal(false)} />
      )}
    </>
  );
}

export default App;
