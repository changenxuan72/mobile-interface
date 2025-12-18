import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, History } from 'lucide-react';
import { PROFILE_USER } from '../constants';

const Wallet: React.FC = () => {
  const navigate = useNavigate();

  const transactions = [
    { id: 1, title: '案件收入: 金融 App UI 改版', date: '2024/03/12', amount: 15000, type: 'income' },
    { id: 2, title: '提現至 中國信託 (822)', date: '2024/03/10', amount: -5000, type: 'withdraw' },
    { id: 3, title: '銷售收入: SaaS UI Kit', date: '2024/03/08', amount: 1200, type: 'income' },
    { id: 4, title: '平台服務費', date: '2024/03/08', amount: -60, type: 'withdraw' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">我的錢包</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
          <div className="flex items-center justify-between mb-8">
            <span className="text-indigo-100 text-sm font-medium">總餘額 (TWD)</span>
            <WalletIcon size={24} className="text-indigo-200 opacity-50" />
          </div>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-bold">NT$ {PROFILE_USER.wallet.toLocaleString()}</span>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <ArrowUpRight size={18} /> 提現
            </button>
            <button className="flex-1 bg-white text-indigo-600 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
              <Plus size={18} /> 儲值
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <span className="text-sm font-bold text-gray-700">卡片管理</span>
          </button>
          <button className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <History size={20} />
            </div>
            <span className="text-sm font-bold text-gray-700">帳單導出</span>
          </button>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-gray-900">收支明細</h2>
            <button className="text-xs font-bold text-indigo-600">查看更多</button>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {transactions.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {t.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {t.type === 'income' ? '+' : ''}{t.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;