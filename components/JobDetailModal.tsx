import React from 'react';
import { X, Star, Clock, DollarSign, MapPin, Share2, Bookmark, Sparkles, MessageSquare } from 'lucide-react';
import { Job } from '../types';

interface JobDetailModalProps {
  job: Job;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-[90vh] sm:h-[85vh] sm:w-[600px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header / Close */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white z-20 sticky top-0">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">案件詳情</h2>
          <button 
            onClick={onClose} 
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
          {/* Job Header Info */}
          <div className="bg-white px-6 py-6 pb-8 mb-2">
            <div className="flex gap-2 mb-3">
                 {job.isUrgent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 uppercase tracking-wider">
                        急件
                    </span>
                 )}
                 <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase tracking-wider">
                    {job.category}
                 </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1.5 text-indigo-600 font-semibold bg-indigo-50 px-3 py-1 rounded-full">
                    <DollarSign size={16} />
                    {job.budget}
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                    <Clock size={16} />
                    {job.deadline}
                </div>
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                    <MapPin size={16} />
                    遠端
                </div>
            </div>

            {/* AI Match Banner */}
            {job.matchRate >= 80 && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={20} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{job.matchRate}% 匹配度</p>
                        <p className="text-xs text-gray-600">你的技能與此案件需求高度吻合</p>
                    </div>
                </div>
            )}
          </div>

          {/* Description Section */}
          <div className="bg-white px-6 py-6 mb-2">
            <h3 className="text-lg font-bold text-gray-900 mb-3">需求描述</h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
            
            <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">技能需求</h4>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            
            {/* AI Assistant Button */}
            <button className="mt-6 w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Sparkles size={16} className="text-indigo-600" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-gray-900">AI 智能問答</p>
                        <p className="text-xs text-gray-500">獲取提案技巧與建議</p>
                    </div>
                </div>
                <MessageSquare size={18} className="text-indigo-400 group-hover:text-indigo-600" />
            </button>
          </div>

          {/* Client Section */}
          <div className="bg-white px-6 py-6 pb-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">發案人資訊</h3>
            <div className="flex items-center gap-4">
                <img src={job.client.avatar} alt={job.client.name} className="w-12 h-12 rounded-full border border-gray-100" />
                <div>
                    <h4 className="font-bold text-gray-900">{job.client.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-900">{job.client.rating}</span>
                        <span className="text-gray-400">• 已驗證付款</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8 sm:pb-4 flex items-center gap-3 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
          <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Bookmark size={20} />
          </button>
          <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Share2 size={20} />
          </button>
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95">
            立即報價
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobDetailModal;