import React, { useState } from 'react';
import { X, Star, MapPin, Globe, CheckCircle, Zap, MessageSquare, Briefcase, Share2, Heart } from 'lucide-react';
import { Talent } from '../types';
import { MOCK_POSTS, MOCK_REVIEWS } from '../constants';

interface TalentDetailModalProps {
  talent: Talent;
  onClose: () => void;
}

const TalentDetailModal: React.FC<TalentDetailModalProps> = ({ talent, onClose }) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews' | 'about'>('portfolio');

  // Mock data for this specific talent
  const talentPortfolio = MOCK_POSTS.slice(0, 6);
  const talentReviews = MOCK_REVIEWS; 

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-[95vh] sm:h-[90vh] sm:w-[500px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Close Button */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-30 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors"
        >
            <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 pb-24">
            
            {/* Header / Cover */}
            <div className="relative">
                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="px-5">
                    <div className="relative -mt-12 mb-3 flex justify-between items-end">
                        <div className="relative">
                            <img 
                                src={talent.user.avatar} 
                                alt={talent.user.name} 
                                className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white" 
                            />
                            {talent.user.isOpenForWork && (
                                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center" title="Open to Work">
                                    <Zap size={14} className="text-white fill-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 mb-2">
                             <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50">
                                <Share2 size={18} />
                             </button>
                             <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm hover:bg-gray-50">
                                <Heart size={18} />
                             </button>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-xl font-bold text-gray-900">{talent.user.name}</h1>
                            <CheckCircle size={16} className="text-blue-500 fill-blue-100" />
                        </div>
                        <p className="text-sm font-semibold text-indigo-600 mb-2">{talent.title}</p>
                        
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-gray-900">{talent.user.rating}</span>
                                <span>(42 評價)</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span>台北, 台灣</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Globe size={14} />
                                <span>中文, English</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {talent.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {talent.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-lg font-bold text-gray-900">{talent.completedCases}</div>
                            <div className="text-[10px] text-gray-500">成交案件</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-lg font-bold text-gray-900">{talent.responseRate}%</div>
                            <div className="text-[10px] text-gray-500">回覆率</div>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm text-center">
                            <div className="text-lg font-bold text-gray-900">{talent.rate}</div>
                            <div className="text-[10px] text-gray-500">參考報價</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Tabs */}
            <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm mb-4">
                <div className="flex px-4">
                    {[
                        { id: 'portfolio', label: '作品集' },
                        { id: 'reviews', label: '評價' },
                        { id: 'about', label: '服務' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
                                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-indigo-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="px-4 min-h-[200px]">
                
                {/* Portfolio */}
                {activeTab === 'portfolio' && (
                    <div className="columns-2 gap-3 space-y-3">
                        {talentPortfolio.map((post) => (
                            <div key={post.id} className="break-inside-avoid bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
                                <div className="p-2">
                                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{post.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Reviews */}
                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {talentReviews.map((review) => (
                            <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <img src={review.reviewer.avatar} alt={review.reviewer.name} className="w-8 h-8 rounded-full bg-gray-100" />
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">{review.reviewer.name}</p>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-gray-400">{review.date}</span>
                                </div>
                                <p className="text-sm text-gray-600">{review.content}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* About / Services Placeholder */}
                {activeTab === 'about' && (
                    <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-2">服務流程</h3>
                            <ul className="space-y-2">
                                <li className="flex gap-3 text-sm text-gray-600">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                    <span>需求溝通與確認</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-600">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                    <span>報價與簽約 (平台保障)</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-600">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                    <span>初稿製作與校對</span>
                                </li>
                                <li className="flex gap-3 text-sm text-gray-600">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                                    <span>完稿交付與驗收</span>
                                </li>
                            </ul>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">常用工具</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Figma', 'Adobe CC', 'Notion', 'Slack'].map(tool => (
                                    <span key={tool} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">{tool}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-4 pb-8 sm:pb-4 flex items-center gap-3 z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
             <MessageSquare size={18} />
             聯繫
          </button>
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
             <Briefcase size={18} />
             邀請報價
          </button>
        </div>

      </div>
    </div>
  );
};

export default TalentDetailModal;