import React, { useState } from 'react';
import { Search, Bell, Heart } from 'lucide-react';
import { ExploreCategory } from '../types';
import { EXPLORE_CATEGORIES, MOCK_POSTS } from '../constants';
import PostDetailModal from '../components/PostDetailModal';
import { Post } from '../types';

const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ExploreCategory>(ExploreCategory.TALENTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Top Navigation - Sticky */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-screen-md mx-auto px-4 pt-12 pb-2">
          
          {/* Header Row: Search & Notification */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search creative works..." 
                className="w-full bg-gray-100 text-gray-900 text-sm rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>

          {/* Categories Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
            {EXPLORE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Masonry Feed */}
      <div className="max-w-screen-md mx-auto px-3 py-4">
        {/* Tailwind Columns for CSS-only Masonry */}
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {MOCK_POSTS.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="break-inside-avoid group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            >
              {/* Image */}
              <div className="relative overflow-hidden w-full">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Info */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="relative flex-shrink-0">
                       <img src={post.author.avatar} alt="Avatar" className="w-5 h-5 rounded-full bg-gray-200" />
                       {post.author.isOpenForWork && (
                         <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                       )}
                    </div>
                    <span className="text-xs text-gray-500 truncate">{post.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-400">
                    <Heart size={12} className={post.likes > 1000 ? "fill-gray-400" : ""} />
                    <span className="text-[10px] font-medium">{post.likes > 1000 ? (post.likes/1000).toFixed(1) + 'k' : post.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">You've reached the end of the list</p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}

    </div>
  );
};

export default Explore;