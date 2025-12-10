import React from 'react';
import { X, Heart, Bookmark, Share2, MessageCircle, DollarSign } from 'lucide-react';
import { Post } from '../types';

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full h-[95vh] sm:h-[90vh] sm:w-[500px] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header / Close */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={onClose} 
            className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-white">
          {/* Media Area */}
          <div className="relative w-full bg-gray-100">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="px-5 py-6 space-y-6">
            
            {/* Title & Author */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-gray-100" />
                    {post.author.isOpenForWork && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-full border border-indigo-600 text-indigo-600 text-xs font-semibold hover:bg-indigo-50 transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="text-gray-600 text-sm leading-relaxed">
              <p>{post.description}</p>
              <br />
              <p className="text-gray-400 text-xs">Category: Graphic Design • Taiwan</p>
            </div>

            <hr className="border-gray-100" />

            {/* Comments / Engagement Stats Placeholder */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">Comments (12)</h3>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="bg-gray-50 rounded-lg p-3 w-full">
                   <p className="text-xs font-semibold text-gray-800">Jane Doe</p>
                   <p className="text-xs text-gray-600 mt-1">Great work! Love the color choices.</p>
                </div>
              </div>
            </div>
            
             {/* Related Placeholder */}
             <div className="pt-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">More like this</h3>
              <div className="grid grid-cols-2 gap-2">
                 <div className="bg-gray-100 aspect-square rounded-lg"></div>
                 <div className="bg-gray-100 aspect-square rounded-lg"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 pb-8 sm:pb-3 flex items-center justify-between z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
          
          <div className="flex items-center gap-2">
            <button className="flex-1 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full shadow-lg shadow-indigo-200 transition-all active:scale-95">
              <MessageCircle size={18} />
              <span className="text-sm font-semibold">Chat</span>
            </button>
            <button className="p-2.5 rounded-full bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100 transition-colors">
                <DollarSign size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-gray-600">
             <button className="flex flex-col items-center gap-0.5 group">
                <Heart size={22} className="group-hover:text-red-500 transition-colors" />
                <span className="text-[10px]">{post.likes}</span>
             </button>
             <button className="flex flex-col items-center gap-0.5 group">
                <Bookmark size={22} className="group-hover:text-yellow-500 transition-colors" />
                <span className="text-[10px]">Save</span>
             </button>
             <button className="flex flex-col items-center gap-0.5">
                <Share2 size={22} />
                <span className="text-[10px]">Share</span>
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetailModal;