import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, GraduationCap, Star, MessageSquare, Lightbulb, ShieldCheck, Target, ChevronRight } from 'lucide-react';
import { MOCK_MENTORS } from '../constants';

const Mentorship: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    { title: '專業作品集健檢', desc: '由資深設計師親自審閱，精準指出視覺與邏輯盲點。', icon: ShieldCheck, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: '市場報價諮詢', desc: '不再為接案報價苦惱，導師分享業界實戰定價策略。', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: '職涯成長指引', desc: '迷惘時的最佳夥伴，協助規劃從新手到高階創作者的路徑。', icon: Lightbulb, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">導師計畫</h1>
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Mentor Program Banner (Moved to top) */}
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">想成為導師嗎？</h3>
            <p className="text-xs text-indigo-100 mb-4 leading-relaxed max-w-[85%]">
              分享你的專業知識，幫助新手創作者克服接案路上的困難，同時建立個人影響力並獲得實質報酬。
            </p>
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => navigate('/app/mentor-application')}
                className="bg-white text-indigo-600 px-6 py-2.5 rounded-full text-xs font-bold shadow-lg active:scale-95 transition-all hover:bg-indigo-50"
              >
                申請加入
              </button>
              <span className="text-[10px] text-indigo-200 font-medium">已有 500+ 位資深創作者加入</span>
            </div>
          </div>
          <GraduationCap size={140} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
          
          {/* Animated decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
        </div>

        {/* Mentor Marketplace List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-gray-900">推薦給你的導師</h2>
            <button className="text-xs font-bold text-indigo-600">查看更多</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {MOCK_MENTORS.map((mentor) => (
              <div 
                key={mentor.id} 
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center transition-transform active:scale-95 group"
              >
                <div className="relative mb-3">
                   <img 
                    src={mentor.avatar} 
                    alt={mentor.name} 
                    className="w-20 h-20 rounded-full object-cover shadow-sm ring-4 ring-gray-50 group-hover:ring-indigo-100 transition-all" 
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">{mentor.name}</h4>
                <div className="flex items-center justify-center gap-1 text-xs text-yellow-500 font-bold mb-4">
                  <Star size={12} fill="currentColor" />
                  <span className="text-gray-900">{mentor.rating}</span>
                </div>
                <button 
                  onClick={() => navigate('/app/mentor-application')}
                  className="text-indigo-600 text-xs font-bold hover:underline py-1"
                >
                  向他提問
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 px-1">為什麼需要導師？</h2>
          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl ${benefit.bg} ${benefit.color} flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics or Fun Fact */}
        <div className="bg-indigo-50 rounded-3xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <MessageSquare size={20} />
             </div>
             <div>
                <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">社群動態</p>
                <p className="text-xs font-bold text-indigo-900">過去 24 小時內有 128 位新手獲得了解答</p>
             </div>
          </div>
          <ChevronRight size={16} className="text-indigo-300" />
        </div>

        {/* Success Stories Placeholder */}
        <section className="pb-8">
           <h2 className="text-base font-bold text-gray-900 px-1 mb-4">學員心得</h2>
           <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex gap-3 items-center mb-3">
                 <img src="https://picsum.photos/seed/review1/50/50" className="w-8 h-8 rounded-full" alt="Reviewer" />
                 <div>
                    <p className="text-xs font-bold text-gray-900">大明</p>
                    <p className="text-[10px] text-gray-400">UI 設計師</p>
                 </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                「透過 Elijah 的作品集健檢，我才發現自己一直以來在層級標註上的疏忽。修改後，我的面試邀約率提升了一倍！」
              </p>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Mentorship;