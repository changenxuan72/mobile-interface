import React, { useState } from 'react';
import { Bell, MessageCircle, Search, Filter } from 'lucide-react';
import { MOCK_CHATS, MOCK_NOTIFICATIONS } from '../constants';
import { ChatSession } from '../types';
import ChatRoomModal from '../components/ChatRoomModal';

const Inbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'notification'>('chat');
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-screen-md mx-auto pt-8 px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">通知中心</h1>
            
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-100">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`pb-3 text-sm font-bold relative transition-colors ${
                        activeTab === 'chat' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    聊天
                    {activeTab === 'chat' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('notification')}
                    className={`pb-3 text-sm font-bold relative transition-colors ${
                        activeTab === 'notification' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    通知
                    {MOCK_NOTIFICATIONS.filter(n => !n.isRead).length > 0 && (
                        <span className="ml-1.5 inline-block w-1.5 h-1.5 bg-red-500 rounded-full mb-0.5"></span>
                    )}
                    {activeTab === 'notification' && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full"></span>
                    )}
                </button>
            </div>
          </div>
      </div>

      <div className="max-w-screen-md mx-auto">
        
        {/* Chat List */}
        {activeTab === 'chat' && (
            <div className="animate-in fade-in duration-300">
                {/* Search Bar */}
                <div className="px-4 py-3">
                    <div className="relative">
                         <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="搜尋對話..." 
                            className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {MOCK_CHATS.map((chat) => (
                        <div 
                            key={chat.id} 
                            onClick={() => setSelectedChat(chat)}
                            className="px-4 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition-colors active:bg-gray-100"
                        >
                            <div className="relative flex-shrink-0">
                                <img src={chat.partner.avatar} alt={chat.partner.name} className="w-12 h-12 rounded-full border border-gray-100 object-cover" />
                                {chat.partner.isOpenForWork && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-sm font-bold text-gray-900 truncate">{chat.partner.name}</h3>
                                        {chat.status === 'active' && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600">交易進行中</span>
                                        )}
                                        {chat.status === 'pending_review' && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600">待驗收</span>
                                        )}
                                    </div>
                                    <span className="text-[10px] text-gray-400 flex-shrink-0">{chat.timestamp}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unreadCount > 0 && (
                                        <span className="ml-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Notification List */}
        {activeTab === 'notification' && (
            <div className="divide-y divide-gray-50 animate-in fade-in duration-300">
                 {MOCK_NOTIFICATIONS.map((notif) => (
                     <div key={notif.id} className={`px-4 py-4 flex gap-4 ${notif.isRead ? 'bg-white' : 'bg-indigo-50/30'}`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                             notif.type === 'job' ? 'bg-blue-100 text-blue-600' :
                             notif.type === 'payment' ? 'bg-green-100 text-green-600' :
                             notif.type === 'like' ? 'bg-red-100 text-red-600' :
                             'bg-gray-100 text-gray-600'
                         }`}>
                             {notif.type === 'job' && <Filter size={18} />}
                             {notif.type === 'payment' && <div className="text-lg font-bold">$</div>}
                             {notif.type === 'like' && <div className="text-lg font-bold">♥</div>}
                             {notif.type === 'system' && <Bell size={18} />}
                         </div>
                         <div className="flex-1">
                             <div className="flex items-center justify-between mb-1">
                                 <h3 className="text-sm font-bold text-gray-900">{notif.title}</h3>
                                 <span className="text-[10px] text-gray-400">{notif.time}</span>
                             </div>
                             <p className="text-sm text-gray-600 leading-relaxed">{notif.content}</p>
                         </div>
                     </div>
                 ))}
            </div>
        )}

      </div>

      {/* Chat Room Modal */}
      {selectedChat && (
        <ChatRoomModal 
            chat={selectedChat} 
            onClose={() => setSelectedChat(null)} 
        />
      )}

    </div>
  );
};

export default Inbox;