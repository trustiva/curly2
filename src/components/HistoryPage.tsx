import { ArrowLeft, Download } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';

interface HistoryPageProps {
  transactions: Transaction[];
  onBack: () => void;
}

export default function HistoryPage({ transactions, onBack }: HistoryPageProps) {
  const handleExport = () => {
    const csvContent = [
      ['Date', 'Coin Pair', 'Price', 'Amount', 'Total'].join(','),
      ...transactions.map(tx =>
        [
          formatDate(tx.executedAt),
          tx.coinPair,
          tx.price,
          tx.amount,
          tx.total,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hodlbot-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0E1116] text-white">
      <nav className="px-6 py-4 border-b border-gray-800 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#1A1F26] rounded-xl transition-colors"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold">Portfolio & History</h1>
      </nav>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#1A1F26] hover:bg-[#1F252E] rounded-xl transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button className="px-4 py-2 bg-[#00D4A1]/10 text-[#00D4A1] hover:bg-[#00D4A1]/20 rounded-xl transition-colors flex items-center gap-2">
              <Download size={18} />
              Tax Report
              <span className="ml-1 px-2 py-0.5 bg-[#00D4A1] text-[#0E1116] text-xs font-bold rounded">
                PRO
              </span>
            </button>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-[#1A1F26] rounded-3xl p-12 text-center">
            <p className="text-gray-400">No transactions yet. Your bot will start buying soon!</p>
          </div>
        ) : (
          <div className="bg-[#1A1F26] rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                      Coin Pair
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">
                      Price
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">
                      Amount
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-400">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-[#1F252E]">
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatDate(tx.executedAt)}
                      </td>
                      <td className="px-6 py-4 font-semibold">{tx.coinPair}</td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {formatCurrency(tx.price)}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-300">
                        {tx.amount.toFixed(6)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold">
                        {formatCurrency(tx.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
