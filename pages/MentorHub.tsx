import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Briefcase, Star, Sparkles, Check, X, RefreshCw, Trophy, Coins } from 'lucide-react';
import { MentorRequest } from '../types';

const MOCK_REQUESTS: MentorRequest[] = [
  {
    id: 'req-1',
    student: { id: 's1', name: '小明', avatar: 'https://picsum.photos/seed/s1/100/100', isOpenForWork: false },
    type: 'portfolio_review',
    content: '老師您好，我想請您幫我看這份 UI 設計作品集，尤其是色彩搭配的部分。',
    time: '2 小時前',
    status: 'pending'
  },
  {
    id: 'req-2',
    student: { id: 's2', name: 'Alice Wu', avatar: 'https://picsum.photos/seed/s2/100/100', isOpenForWork: false },
    type: 'quote_consulting',
    content: '最近接到一個電商改版案，不知道這樣的預算 20k 是否合理？',
    time: '5 小時前',
    status: 'pending'
  },
  {
    id: 'req-3',
    student: { id: 's3', name: '王大壯', avatar: 'https://picsum.photos/seed/s3/100/100', isOpenForWork: false },
    type: 'portfolio_review',
    content: '想轉職插畫師，目前的風格是否足夠市場化？',
    time: '昨天',
    status: 'pending'
  }
];

const MentorHub: React.FC = () => {
  const navigate = useNavigate();
  const [isOnDuty, setIsOnDuty] = useState(true);
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleAction = (id: string, action: 'accept' | 'decline') => {
    setRequests(prev => prev.filter(r => r.id !== id));
    if (action === 'accept') {
      // Logic for going to chat room
      alert('已接受請求，即將進入聊天室。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/app/profile')} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">導師中控台</h1>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-full">
          <button 
            onClick={() => setIsOnDuty(true)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${isOnDuty ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500'}`}
          >
            接案中
          </button>
          <button 
            onClick={() => setIsOnDuty(false)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${!isOnDuty ? 'bg-gray-400 text-white shadow-sm' : 'text-gray-500'}`}
          >
            休息中
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Status Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest">目前等級</p>
                <h2 className="text-3xl font-bold mt-1">Level 4 導師</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl">
                 <Trophy size={24} />
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Coins size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-100 font-bold uppercase">積分餘額</p>
                  <p className="text-lg font-bold">1,280</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Star size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-100 font-bold uppercase">總體評分</p>
                  <p className="text-lg font-bold">4.9 / 5.0</p>
                </div>
              </div>
            </div>
          </div>
          <Sparkles size={120} className="absolute -right-8 -bottom-8 text-white/10" />
        </div>

        {/* Incoming Requests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-gray-900">待處理請求 ({requests.length})</h2>
            <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
              <RefreshCw size={12} /> 刷新
            </button>
          </div>

          <div className="space-y-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img src={req.student.avatar} alt={req.student.name} className="w-10 h-10 rounded-2xl object-cover" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{req.student.name}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        req.type === 'portfolio_review' ? 'bg-purple-50 text-purple-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {req.type === 'portfolio_review' ? '作品集健檢' : '報價諮詢'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{req.time}</span>
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-2xl mb-4">
                  "{req.content}"
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAction(req.id, 'decline')}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-gray-100 text-gray-400 font-bold text-xs hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <X size={16} /> 婉拒
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'accept')}
                    className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-100 active:scale-95 transition-all"
                  >
                    <Check size={16} /> 接受並指導
                  </button>
                </div>

                {/* AI Assistant Preview */}
                {req.type === 'quote_consulting' && (
                  <div className="mt-3 pt-3 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 mb-2 uppercase tracking-wider">
                      <Sparkles size={12} /> AI 建議回覆
                    </div>
                    <div className="text-[10px] text-gray-400 italic">
                      "根據該類別歷史案件大數據，此報價偏低約 15%，建議可以..."
                      <button className="ml-1 text-indigo-500 not-italic hover:underline">採用回覆</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {requests.length === 0 && (
              <div className="text-center py-12 space-y-3">
                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <MessageSquare size={32} />
                 </div>
                 <p className="text-sm text-gray-400 font-medium">目前沒有新的待處理請求</p>
              </div>
            )}
          </div>
        </section>

        {/* Action List */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-gray-900 px-1">工具與設定</h2>
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm divide-y divide-gray-50">
             <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <RefreshCw size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">自動回覆設定</span>
               </div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
             </button>
             <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Briefcase size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">服務收費調整</span>
               </div>
               <ChevronLeft className="rotate-180 text-gray-300" size={16} />
             </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MentorHub;