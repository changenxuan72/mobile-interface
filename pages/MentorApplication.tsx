import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, XCircle, Globe, Link, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';
import { PROFILE_USER } from '../constants';

const MentorApplication: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState({ portfolio: true, quote: true });

  // Verification requirements
  const isEligibleAuto = PROFILE_USER.orders >= 5 && (PROFILE_USER.stats.influence > 80);

  const toggleService = (key: 'portfolio' | 'quote') => {
    setServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    // Navigate to Mentor Hub after application (simulated)
    navigate('/app/mentor-hub');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">申請導師資格</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Verification Section */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 px-1 flex items-center gap-2">
            <ShieldCheck size={18} className="text-indigo-600" />
            資格驗證
          </h2>
          
          {/* Track A: Auto */}
          <div className={`p-5 rounded-3xl border-2 transition-all ${isEligibleAuto ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100 opacity-60'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-900">平台數據驗證 (快速通道)</h3>
                <p className="text-xs text-gray-500 mt-1">根據您的歷史成交與評價自動審核</p>
              </div>
              {isEligibleAuto ? <CheckCircle2 className="text-indigo-600" /> : <XCircle className="text-gray-300" />}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">完成案件數 (目標 5+)</span>
                <span className={`font-bold ${PROFILE_USER.orders >= 5 ? 'text-indigo-600' : 'text-red-500'}`}>{PROFILE_USER.orders} / 5</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">平均影響力 (目標 80+)</span>
                <span className={`font-bold ${PROFILE_USER.stats.influence >= 80 ? 'text-indigo-600' : 'text-red-500'}`}>{PROFILE_USER.stats.influence} / 80</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center py-2">
            <span className="bg-gray-50 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">或者</span>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
          </div>

          {/* Track B: Manual */}
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">外部資歷審核 (人工通道)</h3>
              <p className="text-xs text-gray-500 mt-1">若您在業界已有資歷，請提供證明連結</p>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <Globe size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="作品集連結 (e.g. Behance)" 
                  className="w-full bg-gray-50 text-xs py-3 pl-10 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <Link size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="LinkedIn / 社群連結" 
                  className="w-full bg-gray-50 text-xs py-3 pl-10 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <textarea 
                placeholder="一句話證明您的專業資歷 (e.g. 曾任 4A 廣告公司資深美術)"
                rows={2}
                className="w-full bg-gray-50 text-xs p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Service Setup */}
        <section className="space-y-4">
          <h2 className="text-base font-bold text-gray-900 px-1">服務設定</h2>
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">作品集健檢</p>
                <p className="text-[10px] text-gray-500">預設消耗: 100 積分</p>
              </div>
              <button 
                onClick={() => toggleService('portfolio')}
                className={`w-12 h-6 rounded-full transition-colors relative ${services.portfolio ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${services.portfolio ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-900">報價諮詢</p>
                <p className="text-[10px] text-gray-500">預設消耗: 50 積分</p>
              </div>
              <button 
                onClick={() => toggleService('quote')}
                className={`w-12 h-6 rounded-full transition-colors relative ${services.quote ? 'bg-indigo-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${services.quote ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button 
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isEligibleAuto ? (
              <>
                <Sparkles size={20} />
                立即啟用導師資格
              </>
            ) : (
              '提交申請審核'
            )}
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-4 px-8 leading-relaxed">
            成為導師即代表您同意平台之《導師服務規章》，我們將致力於維護良好的創作者成長生態。
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorApplication;