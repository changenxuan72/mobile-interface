import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, Clock, Sparkles, Filter } from 'lucide-react';
import { MOCK_JOBS, JOB_CATEGORIES } from '../constants';
import { Job } from '../types';
import JobDetailModal from '../components/JobDetailModal';

const Jobs: React.FC = () => {
  const [role, setRole] = useState<'creator' | 'client'>('creator');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Filter jobs logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    if (selectedCategory === '全部') return true;
    return job.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header & Role Toggle */}
      <div className="bg-white px-4 pt-8 pb-4 border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">案件大廳</h1>
                <div className="flex bg-gray-100 p-1 rounded-full">
                    <button 
                        onClick={() => setRole('client')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${role === 'client' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        我是發案人
                    </button>
                    <button 
                        onClick={() => setRole('creator')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${role === 'creator' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        我是創作者
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input 
                    type="text" 
                    placeholder={role === 'creator' ? "搜尋案件..." : "搜尋我的刊登..."}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                />
                <button className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                    <SlidersHorizontal size={18} />
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 py-4 space-y-8">
        
        {/* AI Recommendations (Horizontal Scroll) */}
        {role === 'creator' && (
            <section>
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={18} className="text-indigo-600 fill-indigo-100" />
                    <h2 className="text-base font-bold text-gray-900">為你推薦</h2>
                </div>
                
                <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2 -mx-4 px-4">
                    {MOCK_JOBS.slice(0, 3).map((job) => (
                        <div 
                            key={`rec-${job.id}`}
                            onClick={() => setSelectedJob(job)}
                            className="min-w-[280px] bg-white rounded-xl p-4 shadow-sm border border-indigo-50 hover:border-indigo-200 transition-all cursor-pointer relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                                {job.matchRate}% 匹配度
                            </div>
                            <div className="mb-3">
                                <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-2 inline-block">
                                    {job.category}
                                </span>
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                            </div>
                            <div className="flex items-center justify-between text-xs mt-4">
                                <span className="font-bold text-gray-900">{job.budget}</span>
                                <span className="text-gray-500">{job.deadline}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Job List Section */}
        <section>
             {/* Filter Chips */}
             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 mb-2">
                <button className="p-2 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-gray-300">
                    <Filter size={16} />
                </button>
                {JOB_CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                            selectedCategory === cat 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Vertical Cards */}
            <div className="space-y-3">
                {filteredJobs.map((job) => (
                    <div 
                        key={job.id} 
                        onClick={() => setSelectedJob(job)}
                        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4"
                    >
                        {/* Left: Avatar */}
                        <div className="flex-shrink-0">
                            <img src={job.client.avatar} alt="Client" className="w-12 h-12 rounded-lg bg-gray-50 object-cover border border-gray-100" />
                        </div>

                        {/* Middle: Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                                {job.isUrgent && (
                                    <span className="flex-shrink-0 ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                        急件
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                                {job.description}
                            </p>

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

                        {/* Right: Meta */}
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
        </section>

      </div>

      {/* Floating Action Button (Client Mode) */}
      {role === 'client' && (
          <button className="fixed bottom-20 right-4 bg-gray-900 text-white p-4 rounded-full shadow-lg shadow-gray-400/30 hover:bg-gray-800 transition-colors z-30">
              <span className="text-2xl font-light">+</span>
          </button>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
        />
      )}

    </div>
  );
};

export default Jobs;