
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Added Briefcase to imports
import { Search, Bell, Heart, Sparkles, Clock, Star, Trophy, PlayCircle, BookOpen, ChevronRight, X, MessageSquare, CheckCircle2, Briefcase } from 'lucide-react';
import { ExploreCategory, Mentor } from '../types';
import { EXPLORE_CATEGORIES, MOCK_POSTS, MOCK_JOBS, MOCK_PRODUCTS, MOCK_MENTORS } from '../constants';
import PostDetailModal from '../components/PostDetailModal';
import JobDetailModal from '../components/JobDetailModal';
import { Post, Job } from '../types';

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ExploreCategory>(ExploreCategory.TALENTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  // Helper to render Masonry Grid for Posts (Talents & Following)
  const renderPostGrid = (posts: Post[]) => (
    <div className="columns-2 md:columns-3 gap-3">
      {posts.map((post) => (
        <div 
          key={post.id} 
          onClick={() => setSelectedPost(post)}
          className="mb-3 break-inside-avoid bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 group relative transform-gpu"
        >
          {/* Image with Aspect Ratio Placeholder */}
          <div className={`relative w-full bg-gray-100 ${post.aspectRatio}`}>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
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
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      
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
            <button 
              onClick={() => navigate('/app/inbox')}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
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

      {/* Main Content Area */}
      <div className="max-w-screen-md mx-auto px-3 py-4">
        
        {/* VIEW 1: TALENTS (Default) */}
        {activeCategory === ExploreCategory.TALENTS && renderPostGrid(MOCK_POSTS)}

        {/* VIEW 2: FOLLOWING */}
        {activeCategory === ExploreCategory.FOLLOWING && (
           <>
              {/* Stories Bar */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar mb-6 pb-2 -mx-3 px-3">
                  <div className="flex flex-col items-center gap-1 cursor-pointer">
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                          <span className="text-xl text-gray-400">+</span>
                      </div>
                      <span className="text-[10px] text-gray-500">Add Story</span>
                  </div>
                  {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex flex-col items-center gap-1 cursor-pointer">
                          <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-indigo-600">
                              <img src={`https://picsum.photos/seed/user${i}/100/100`} className="w-full h-full rounded-full border-2 border-white" alt="Story" />
                          </div>
                          <span className="text-[10px] text-gray-600">User {i}</span>
                      </div>
                  ))}
              </div>
              {renderPostGrid(MOCK_POSTS.slice().reverse())}
           </>
        )}

        {/* VIEW 3: JOBS */}
        {activeCategory === ExploreCategory.JOBS && (
            <div className="space-y-3">
                 {MOCK_JOBS.map((job) => (
                    <div 
                        key={job.id} 
                        onClick={() => setSelectedJob(job)}
                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4"
                    >
                        <div className="flex-shrink-0">
                            <img src={job.client.avatar} alt="Client" className="w-12 h-12 rounded-lg bg-gray-50 object-cover border border-gray-100" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                                {job.isUrgent && (
                                    <span className="flex-shrink-0 ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                        急件
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">{job.description}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                    <span>{job.client.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <span>•</span>
                                    <span>{job.postedAt}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end justify-between min-w-[80px]">
                            <span className="text-sm font-bold text-gray-900">{job.budget}</span>
                            <div className="flex items-center gap-1 text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                <Clock size={10} />
                                <span>{job.deadline.replace(' left', '')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* VIEW 4: ROOKIE */}
        {activeCategory === ExploreCategory.ROOKIE && (
            <div className="space-y-8 pb-12">
                {/* Banner */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 text-indigo-100">
                             <Trophy size={16} />
                             <span className="text-xs font-bold uppercase tracking-wider">新手挑戰</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">完成你的第一個專案</h2>
                        <p className="text-indigo-100 text-sm mb-4 max-w-[80%]">接案並不難！跟著我們的 7 天新手引導，輕鬆獲得第一筆收入。</p>
                        <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                            開始挑戰
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                         <Sparkles size={180} />
                    </div>
                </div>

                {/* 1. 「導師推薦」橫向捲動列 */}
                <section className="animate-in fade-in slide-in-from-left duration-500">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Sparkles size={18} className="text-yellow-500 fill-yellow-100" />
                            推薦導師
                        </h3>
                        <button className="text-xs text-gray-500 hover:text-gray-900">查看全部</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-3 px-3 pb-2">
                        {MOCK_MENTORS.map((mentor) => (
                            <div 
                                key={mentor.id}
                                className="min-w-[160px] max-w-[160px] bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center text-center group transition-all hover:shadow-md"
                            >
                                <div className="relative mb-3">
                                    <img src={mentor.avatar} alt={mentor.name} className="w-16 h-16 rounded-full border-2 border-indigo-50" />
                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                                        <CheckCircle2 size={14} className="text-indigo-500 fill-indigo-50" />
                                    </div>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 mb-1">{mentor.name}</h4>
                                <div className="flex flex-wrap justify-center gap-1 mb-4">
                                    {mentor.tags.map(tag => (
                                        <span key={tag} className="text-[9px] font-bold text-indigo-600 bg-indigo-50/50 px-1.5 py-0.5 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setSelectedMentor(mentor)}
                                    className="w-full py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-bold shadow-sm shadow-indigo-100 group-hover:bg-indigo-700 transition-colors"
                                >
                                    向他提問
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. 「新手任務」懸浮條 (第一格) */}
                <div className="bg-white border border-indigo-100 rounded-2xl p-4 shadow-sm flex items-center justify-between animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-900">當前優先任務</p>
                            <p className="text-[10px] text-gray-500">完成個人檔案獲取 100 積分</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-indigo-500 rounded-full"></div>
                        </div>
                        <button className="text-[10px] font-bold text-indigo-600">去完成</button>
                    </div>
                </div>

                {/* Section: Tutorials */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <PlayCircle size={18} className="text-indigo-600" />
                            推薦課程
                        </h3>
                        <button className="text-xs text-gray-500 hover:text-gray-900">查看更多</button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                         {MOCK_PRODUCTS.filter(p => p.category === '教程' || p.category === 'UI Kit').slice(0, 4).map(prod => (
                             <div key={prod.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer group">
                                 <div className="aspect-video bg-gray-200 relative">
                                     <img src={prod.coverUrl} alt={prod.title} className="w-full h-full object-cover" />
                                     <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                         <PlayCircle size={32} className="text-white fill-black/20" />
                                     </div>
                                 </div>
                                 <div className="p-3">
                                     <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mb-1">{prod.title}</h4>
                                     <span className="text-[10px] text-gray-500">{prod.author.name}</span>
                                 </div>
                             </div>
                         ))}
                    </div>
                </section>

                {/* Section: Guides */}
                <section>
                     <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                        <BookOpen size={18} className="text-indigo-600" />
                        接案指南
                    </h3>
                    <div className="space-y-3">
                        {[
                            { title: '如何撰寫完美的報價單？', readTime: '5 min read', likes: 230 },
                            { title: '合約陷阱！簽約前必須注意的 5 件事', readTime: '8 min read', likes: 542 },
                            { title: '從零開始建立個人品牌', readTime: '6 min read', likes: 189 }
                        ].map((guide, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                     <div className="text-2xl font-bold text-gray-200">0{i+1}</div>
                                     <div>
                                         <h4 className="text-sm font-bold text-gray-900 mb-1">{guide.title}</h4>
                                         <p className="text-xs text-gray-500">{guide.readTime} • {guide.likes} likes</p>
                                     </div>
                                </div>
                                <div className="p-1.5 bg-gray-50 rounded-full text-gray-400">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        )}

        {/* End of List Message */}
        <div className="mt-8 text-center pb-8">
            <p className="text-xs text-gray-400">
                {activeCategory === ExploreCategory.TALENTS ? "You've reached the end of the list" : ""}
                {activeCategory === ExploreCategory.FOLLOWING ? "No more updates" : ""}
                {activeCategory === ExploreCategory.JOBS ? "Check back later for more jobs" : ""}
            </p>
        </div>
      </div>

      {/* Mentor Bottom Sheet / Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" 
            onClick={() => setSelectedMentor(null)}
          />
          <div className="relative w-full max-w-screen-md bg-white rounded-t-3xl shadow-2xl p-6 pb-12 pointer-events-auto animate-in slide-in-from-bottom-full duration-300">
             <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
             
             <div className="flex items-start justify-between mb-6">
                 <div className="flex gap-4">
                    <img src={selectedMentor.avatar} alt={selectedMentor.name} className="w-16 h-16 rounded-2xl shadow-sm" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedMentor.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold mb-1">
                            <Star size={14} fill="currentColor" />
                            <span>{selectedMentor.rating}</span>
                            <span className="text-gray-400 ml-2">• 回答過 {selectedMentor.answerCount} 個問題</span>
                        </div>
                        <div className="flex gap-1">
                            {selectedMentor.tags.map(tag => (
                                <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedMentor(null)} className="p-2 text-gray-400">
                    <X size={24} />
                 </button>
             </div>

             <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-2">關於導師</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedMentor.bio}</p>
             </div>

             <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 mb-4">提問選項</h4>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all group">
                    <div className="flex items-center gap-3">
                        <MessageSquare size={18} className="text-indigo-600" />
                        <span className="text-sm font-bold text-gray-700">單次文字諮詢</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-600">50 積分 / 次</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-indigo-200 transition-all">
                    <div className="flex items-center gap-3">
                        <PlayCircle size={18} className="text-purple-600" />
                        <span className="text-sm font-bold text-gray-700">預約 15 分鐘線上會議</span>
                    </div>
                    <span className="text-xs font-bold text-purple-600">200 積分 / 次</span>
                </button>
             </div>

             <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg mt-8 shadow-xl shadow-gray-200 active:scale-95 transition-transform">
                確認提問
             </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
      
      {selectedJob && (
        <JobDetailModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
        />
      )}

    </div>
  );
};

export default Explore;
