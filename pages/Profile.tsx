import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Share2, Wallet, Package, GraduationCap, BarChart3, Star, Heart, Plus, MapPin } from 'lucide-react';
import { MOCK_POSTS, MOCK_PRODUCTS, MOCK_REVIEWS, PROFILE_USER } from '../constants';
import PostDetailModal from '../components/PostDetailModal';
import { Post } from '../types';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'products' | 'reviews'>('portfolio');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Reusing post detail modal logic
  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const featureItems = [
    { name: '我的錢包', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50', path: '/app/wallet' },
    { name: '訂單管理', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50', path: '/app/orders' },
    { name: '導師計畫', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50', path: '/app/mentorship' },
    { name: '數據分析', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/app/analytics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* Header Section */}
      <div className="bg-white pb-2 mb-2">
        {/* Cover Image */}
        <div className="relative h-32 sm:h-48 w-full bg-gray-200">
            <img src={PROFILE_USER.cover} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-black/30 text-white rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors">
                    <Share2 size={20} />
                </button>
                <button 
                    onClick={() => navigate('/settings')}
                    className="p-2 bg-black/30 text-white rounded-full backdrop-blur-sm hover:bg-black/40 transition-colors"
                >
                    <Settings size={20} />
                </button>
            </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 relative">
            {/* Avatar */}
            <div className="-mt-12 mb-3">
                <div className="inline-block relative">
                    <img 
                        src={PROFILE_USER.avatar} 
                        alt={PROFILE_USER.name} 
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover" 
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                         <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Name & Title */}
            <div className="mb-4">
                <h1 className="text-xl font-bold text-gray-900">{PROFILE_USER.name}</h1>
                <p className="text-sm text-gray-500 font-medium mb-1">{PROFILE_USER.title}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPin size={12} />
                    <span>台北市, 台灣</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{PROFILE_USER.bio}</p>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4">
                <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                    <span className="text-lg font-bold text-gray-900">{PROFILE_USER.stats.followers}</span>
                    <span className="text-xs text-gray-500">粉絲</span>
                </div>
                <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                    <span className="text-lg font-bold text-gray-900">{PROFILE_USER.stats.following}</span>
                    <span className="text-xs text-gray-500">關注</span>
                </div>
                <div className="flex flex-col items-center flex-1 cursor-pointer group relative">
                    <span className="text-lg font-bold text-indigo-600">{PROFILE_USER.stats.influence}</span>
                    <div className="flex items-center gap-1">
                         <span className="text-xs text-gray-500">影響力</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    </div>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-4 gap-4 mb-4">
                {featureItems.map((item) => (
                    <button 
                        key={item.name} 
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center gap-2 group"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm`}>
                            <item.icon className={item.color} size={22} />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Content Tabs (Sticky) */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
         <div className="flex">
            {[
                { id: 'portfolio', label: '作品集' },
                { id: 'products', label: '架上商品' },
                { id: 'reviews', label: '評價記錄' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
                        activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-900 rounded-full"></div>
                    )}
                </button>
            ))}
         </div>
      </div>

      {/* Content Area */}
      <div className="px-4 py-4 min-h-[300px]">
        
        {/* Portfolio - Waterfall */}
        {activeTab === 'portfolio' && (
             <div className="columns-2 gap-3 space-y-3">
                 {MOCK_POSTS.slice(0, 10).map((post) => (
                    <div 
                        key={post.id} 
                        onClick={() => handlePostClick(post)}
                        className="break-inside-avoid bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer"
                    >
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" />
                        <div className="p-2">
                             <h3 className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">{post.title}</h3>
                             <div className="flex items-center justify-between">
                                 <span className="text-[10px] text-gray-500">{post.tags?.[0] || 'Design'}</span>
                                 <div className="flex items-center gap-0.5 text-gray-400">
                                     <Heart size={10} />
                                     <span className="text-[10px]">{post.likes}</span>
                                 </div>
                             </div>
                        </div>
                    </div>
                 ))}
             </div>
        )}

        {/* Products - Grid */}
        {activeTab === 'products' && (
            <div className="grid grid-cols-2 gap-3">
                {MOCK_PRODUCTS.slice(0, 4).map((product) => (
                     <div key={product.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                        <div className="aspect-square bg-gray-200 relative">
                            <img src={product.coverUrl} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-2">
                            <h3 className="text-xs font-bold text-gray-900 line-clamp-2 h-8 mb-1">{product.title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-indigo-600">NT$ {product.price}</span>
                                <span className="text-[10px] text-gray-400">{product.sales} 售出</span>
                            </div>
                        </div>
                     </div>
                ))}
            </div>
        )}

        {/* Reviews - List */}
        {activeTab === 'reviews' && (
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 p-3 bg-gray-100 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">4.9</div>
                    <div className="flex-1">
                        <div className="flex text-yellow-400 mb-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <p className="text-xs text-gray-500">基於 32 筆評價</p>
                    </div>
                </div>

                {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-2">
                                 <img src={review.reviewer.avatar} alt={review.reviewer.name} className="w-8 h-8 rounded-full" />
                                 <div>
                                     <h4 className="text-xs font-bold text-gray-900">{review.reviewer.name}</h4>
                                     <span className="text-[10px] text-gray-400">{review.date}</span>
                                 </div>
                             </div>
                             <div className="flex items-center gap-0.5 text-yellow-400">
                                 <Star size={12} fill="currentColor" />
                                 <span className="text-xs font-bold text-gray-900 ml-1">{review.rating}</span>
                             </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                        {review.projectName && (
                            <div className="inline-block px-2 py-1 bg-gray-100 rounded text-[10px] text-gray-500">
                                專案：{review.projectName}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}

      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 bg-gray-900 text-white p-4 rounded-full shadow-lg shadow-gray-400/30 hover:bg-gray-800 transition-all active:scale-95 z-30">
        <Plus size={24} />
      </button>

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}

    </div>
  );
};

export default Profile;