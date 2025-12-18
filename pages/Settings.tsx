import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Bell, Shield, CreditCard, HelpCircle, FileText, LogOut, ChevronRight, Moon, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to login on logout
    navigate('/login');
  };

  const SettingItem = ({ icon: Icon, label, value, onClick, isDestructive }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 ${isDestructive ? 'text-red-500' : 'text-gray-900'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isDestructive ? 'bg-red-50' : 'bg-gray-100'} ${isDestructive ? 'text-red-500' : 'text-gray-600'}`}>
           <Icon size={20} />
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-gray-400">{value}</span>}
        {!isDestructive && <ChevronRight size={16} className="text-gray-300" />}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Header */}
      <div className="bg-white sticky top-0 z-30 px-4 py-3 shadow-sm flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">設定</h1>
      </div>

      <div className="p-4 space-y-6 animate-in slide-in-from-right duration-300">
        
        {/* Section: Account */}
        <div className="space-y-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">帳號</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <SettingItem icon={User} label="個人資料" />
                <SettingItem icon={CreditCard} label="支付與收款" />
                <SettingItem icon={Shield} label="隱私與安全" />
            </div>
        </div>

        {/* Section: App */}
        <div className="space-y-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">一般</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <SettingItem icon={Bell} label="通知設定" />
                <SettingItem icon={Moon} label="外觀" value="系統預設" />
                <SettingItem icon={Globe} label="語言" value="繁體中文" />
            </div>
        </div>

        {/* Section: Support */}
        <div className="space-y-2">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">支援</h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <SettingItem icon={HelpCircle} label="幫助中心" />
                <SettingItem icon={FileText} label="服務條款與隱私權政策" />
            </div>
        </div>

        {/* Logout */}
        <button 
            onClick={handleLogout}
            className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-gray-100 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
        >
            <LogOut size={20} />
            登出
        </button>

        <p className="text-center text-xs text-gray-400 mt-4 pb-8">Version 1.0.0 (Build 20240315)</p>
      </div>
    </div>
  );
};

export default Settings;