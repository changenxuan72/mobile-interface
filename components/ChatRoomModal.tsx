import React from 'react';
import { X, Send, Paperclip, CreditCard, FileText, Sparkles, Image, ChevronLeft, MoreVertical } from 'lucide-react';
import { ChatSession, Message } from '../types';
import { MOCK_MESSAGES } from '../constants';

interface ChatRoomModalProps {
  chat: ChatSession;
  onClose: () => void;
}

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({ chat, onClose }) => {
  const aiSuggestions = ["好的，沒問題！", "我會盡快處理", "請確認附件"];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 shadow-sm z-20">
        {/* Nav Bar */}
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
                <button onClick={onClose} className="p-1 -ml-1 text-gray-600 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex items-center gap-3">
                    <img src={chat.partner.avatar} alt="Partner" className="w-10 h-10 rounded-full border border-gray-100" />
                    <div>
                        <h2 className="text-sm font-bold text-gray-900">{chat.partner.name}</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs text-gray-500">線上</span>
                        </div>
                    </div>
                </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
            </button>
        </div>

        {/* Sticky Deal Status Bar */}
        {chat.status !== 'none' && (
             <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2 mb-1.5">
                        {chat.status === 'active' && <span className="text-[10px] font-bold text-white bg-indigo-500 px-1.5 py-0.5 rounded">交易進行中</span>}
                        {chat.status === 'pending_review' && <span className="text-[10px] font-bold text-white bg-orange-500 px-1.5 py-0.5 rounded">待驗收</span>}
                        {chat.status === 'completed' && <span className="text-[10px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded">已完成</span>}
                        <span className="text-xs font-semibold text-gray-700 truncate max-w-[150px]">{chat.jobTitle}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                            style={{ width: `${chat.jobProgress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="text-xs font-bold text-indigo-600 whitespace-nowrap">
                    {chat.jobProgress}% 完成
                </div>
            </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        <div className="text-center text-xs text-gray-400 my-4">今天 09:00</div>
        
        {MOCK_MESSAGES.map((msg) => {
            const isMe = msg.senderId === 'me';
            return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end flex flex-col' : 'items-start flex flex-col'}`}>
                        <div 
                            className={`px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm ${
                                isMe 
                                ? 'bg-indigo-600 text-white rounded-br-none' 
                                : 'bg-white text-gray-900 rounded-bl-none border border-gray-100'
                            }`}
                        >
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400 px-1">
                            {msg.timestamp}
                        </span>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Footer Area */}
      <div className="bg-white border-t border-gray-100 p-4 pb-8 sm:pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-20">
        
        {/* AI Quick Replies */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
             <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full border border-indigo-100 mr-1 flex-shrink-0">
                <Sparkles size={12} className="text-indigo-600" />
                <span className="text-[10px] font-bold text-indigo-600">AI 建議</span>
             </div>
             {aiSuggestions.map((text) => (
                 <button key={text} className="whitespace-nowrap px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors">
                     {text}
                 </button>
             ))}
        </div>

        {/* Input & Tools */}
        <div className="flex items-end gap-3">
             {/* Tool Buttons */}
             <div className="flex items-center gap-1 pb-2 text-gray-400">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-indigo-500">
                    <CreditCard size={22} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <FileText size={22} />
                </button>
                 <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Image size={22} />
                </button>
             </div>

             {/* Text Input */}
             <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-2">
                 <input 
                    type="text" 
                    placeholder="輸入訊息..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400 max-h-24 py-1"
                 />
                 <button className="ml-2 p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
                     <Send size={16} />
                 </button>
             </div>
        </div>
      </div>

    </div>
  );
};

export default ChatRoomModal;