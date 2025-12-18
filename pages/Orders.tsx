import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Package, Clock, CheckCircle2, MessageSquare, MoreHorizontal } from 'lucide-react';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'review' | 'completed'>('ongoing');

  const orders = [
    { id: 1, title: '金融 App UI/UX 改版', client: 'FinTech Co.', status: '進行中', progress: 80, price: 'NT$ 45,000', deadline: '2024/03/25', tab: 'ongoing' },
    { id: 2, title: '品牌 Logo 設計專案', client: 'Bean & Leaf', status: '待驗收', progress: 100, price: 'NT$ 8,500', deadline: '2024/03/15', tab: 'review' },
    { id: 3, title: '電商網站 Banner 設計', client: 'Luxe Mode', status: '已完成', progress: 100, price: 'NT$ 3,200', deadline: '2024/02/28', tab: 'completed' },
  ];

  const filteredOrders = orders.filter(o => o.tab === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">訂單管理</h1>
        </div>
        <div className="flex px-4 border-t border-gray-50">
          {[
            { id: 'ongoing', label: '進行中' },
            { id: 'review', label: '待評價' },
            { id: 'completed', label: '已完成' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{order.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{order.client}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider mb-2">
                  <span className="text-gray-400">專案進度</span>
                  <span className="text-indigo-600">{order.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{ width: `${order.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">預算</span>
                    <span className="text-sm font-bold text-gray-900">{order.price}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">截止</span>
                    <span className="text-sm font-bold text-gray-900">{order.deadline}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 border border-gray-100"><MessageSquare size={18} /></button>
                  <button className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold shadow-lg shadow-gray-200">
                    {activeTab === 'ongoing' ? '查看工作' : activeTab === 'review' ? '立即評價' : '再次合作'}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
            <Clock size={48} className="opacity-20" />
            <p className="text-sm font-medium">尚無相關訂單紀錄</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;