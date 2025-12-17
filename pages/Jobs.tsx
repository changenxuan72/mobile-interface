import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, Clock, Sparkles, Filter, Briefcase, Users, Zap, MessageSquare } from 'lucide-react';
import { MOCK_JOBS, JOB_CATEGORIES, MOCK_TALENTS } from '../constants';
import { Job, Talent } from '../types';
import JobDetailModal from '../components/JobDetailModal';
import TalentDetailModal from '../components/TalentDetailModal';

const Jobs: React.FC = () => {
  const [role, setRole] = useState<'creator' | 'client'>('creator');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  // Filter jobs logic
  const filteredJobs = MOCK_JOBS.filter(job => {
    if (selectedCategory === '全部') return true;
    return job.category === selectedCategory;
  });

  // Filter talents logic (reusing same category state for simplicity)
  const filteredTalents = MOCK_TALENTS.filter(talent => {
     if (selectedCategory === '全部') return true;
     return talent.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header & Role Toggle */}
      <div className="bg-white px-4 pt-8 pb-4 border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    {role === 'creator' ? '案件大廳' : '人才市集'}
                </h1>
                <div className="flex bg-gray-100 p-1 rounded-full">
                    <button 
                        onClick={() => { setRole('client'); setSelectedCategory('全部'); }}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${role === 'client' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                    >
                        我是發案人
                    </button>
                    <button 
                        onClick={() => { setRole('creator'); setSelectedCategory('全部'); }}
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
                    placeholder={role === 'creator' ? "搜尋案件..." : "搜尋設計師、工程師..."}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-400"
                />
                <button className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600">
                    <SlidersHorizontal size={18} />
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 py-4 space-y-8">
        
        {/* Recommendation Section (Different for each role) */}
        <section>
            <div className="flex items-center gap-2 mb-3">
                <Sparkles size={18} className="text-indigo-600 fill-indigo-100" />
                <h2 className="text-base font-bold text-gray-900">
                    {role === 'creator' ? '為你推薦的案件' : '優質創作者推薦'}
                </h2>
            </div>
            
            <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2 -mx-4 px-4">
                {role === 'creator' ? (
                    // Creator Mode: Recommended Jobs
                    MOCK_JOBS.slice(0, 3).map((job) => (
                        <div 
                            key={`rec-job-${job.id}`}
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
                    ))
                ) : (
                    // Client Mode: Recommended Talents
                    MOCK_TALENTS.slice(0, 3).map((talent) => (
                        <div 
                            key={`rec-talent-${talent.id}`}
                            onClick={() => setSelectedTalent(talent)}
                            className="min-w-[280px] bg-white rounded-xl p-4 shadow-sm border border-purple-50 hover:border-purple-200 transition-all cursor-pointer relative overflow-hidden group"
                        >
                            {talent.user.isOpenForWork && (
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                                    <Zap size={10} fill="currentColor" />
                                    可接案
                                </div>
                            )}
                            <div className="flex items-center gap-3 mb-3">
                                <img src={talent.user.avatar} alt={talent.user.name} className="w-10 h-10 rounded-full border border-gray-100" />
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{talent.user.name}</h3>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                        <span>{talent.user.rating}</span>
                                    </div>
                                </div>
                            </div>
                             <p className="text-xs text-gray-600 line-clamp-1 mb-2 font-medium text-indigo-600">{talent.title}</p>
                            <div className="flex flex-wrap gap-1">
                                {talent.skills.slice(0, 2).map(skill => (
                                    <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

        {/* Main List Section */}
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

            {/* List Content */}
            <div className="space-y-3">
                {role === 'creator' ? (
                    // JOB CARDS
                    filteredJobs.map((job) => (
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
                    ))
                ) : (
                    // TALENT CARDS
                    filteredTalents.map((talent) => (
                        <div 
                            key={talent.id} 
                            onClick={() => setSelectedTalent(talent)}
                            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="flex gap-4">
                                {/* Left: Avatar */}
                                <div className="flex-shrink-0 relative">
                                    <img src={talent.user.avatar} alt="Talent" className="w-14 h-14 rounded-full border border-gray-100 object-cover" />
                                    {talent.user.isOpenForWork && (
                                         <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm" title="Open to Work">
                                            <Zap size={12} className="text-green-500 fill-green-500" />
                                         </div>
                                    )}
                                </div>

                                {/* Middle: Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className="text-sm font-bold text-gray-900">{talent.user.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs font-bold text-gray-900">{talent.user.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs font-semibold text-indigo-600 mb-2">{talent.title}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                        {talent.bio}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {talent.skills.slice(0, 3).map(skill => (
                                            <span key={skill} className="px-2 py-0.5 bg-gray-50 text-gray-500 text-[10px] rounded-full border border-gray-100">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Actions */}
                            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400">參考報價</span>
                                    <span className="text-sm font-bold text-gray-900">{talent.rate}</span>
                                </div>
                                <div className="flex gap-2">
                                     <button className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                                        <Users size={16} />
                                     </button>
                                     <button className="flex items-center gap-1.5 bg-gray-900 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-800">
                                        <MessageSquare size={14} />
                                        聯繫
                                     </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>

      </div>

      {/* Floating Action Button (Client Mode) */}
      {role === 'client' && (
          <button className="fixed bottom-24 right-4 bg-gray-900 text-white p-4 rounded-full shadow-lg shadow-gray-400/30 hover:bg-gray-800 transition-colors z-30 flex items-center justify-center">
              <span className="text-2xl font-light leading-none pb-1">+</span>
          </button>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
        />
      )}

      {/* Talent Detail Modal */}
      {selectedTalent && (
        <TalentDetailModal
            talent={selectedTalent}
            onClose={() => setSelectedTalent(null)}
        />
      )}

    </div>
  );
};

export default Jobs;