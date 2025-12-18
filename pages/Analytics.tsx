import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart3, TrendingUp, Users, Eye, ArrowUp, MousePointer2, Star } from 'lucide-react';

const Analytics: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: '作品集瀏覽', value: '12.8k', change: '+24%', icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '潛在客戶數', value: '45', change: '+12%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: '連結點擊率', value: '3.2%', change: '+0.5%', icon: MousePointer2, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: '平均評分', value: '4.9', change: '+0.1', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">數據分析</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">總收入概況</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">NT$ 248,500</h2>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold">
              <TrendingUp size={14} />
              +18.5%
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-40 flex items-end justify-between gap-1 mt-4">
            {[40, 65, 45, 80, 55, 90, 75, 60, 85, 40, 50, 95].map((height, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 bg-indigo-500/10 group-hover:bg-indigo-500`}
                  style={{ height: `${height}%` }}
                />
                {i % 3 === 0 && (
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-medium">
                    {i+1}月
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-4`}>
                <s.icon size={20} />
              </div>
              <p className="text-xs text-gray-400 font-medium">{s.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-gray-900">{s.value}</span>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center">
                  <ArrowUp size={10} /> {s.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Content */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 px-1">熱門作品分析</h2>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            {[
              { title: '金融 App UI Kit', views: '2.4k', sales: 128 },
              { title: '品牌設計作品集', views: '1.8k', sales: 0 },
              { title: '3D 渲染練習', views: '950', sales: 0 },
            ].map((item, i) => (
              <div key={item.title} className="p-4 flex items-center justify-between border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.title}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">瀏覽</p>
                    <p className="text-sm font-bold text-gray-700">{item.views}</p>
                  </div>
                  <div className="text-right min-w-[40px]">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">銷售</p>
                    <p className="text-sm font-bold text-indigo-600">{item.sales}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;